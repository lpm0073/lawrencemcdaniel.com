import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { afterEach, describe, expect, it } from 'vitest'

import { server } from '../../../test/server'
import { SMARTER_DEVELOPER_BOT } from './content'
import SmarterChat from './SmarterChat'
import {
  isChatbotAvailable,
  loadEmbedScript,
  UI_CHAT_EMBED_URL,
} from './smarterChatEmbed'

const CONFIG_URL = SMARTER_DEVELOPER_BOT.chatbot + 'config/'

const embedScripts = () =>
  // eslint-disable-next-line testing-library/no-node-access -- a script in the head has no role
  document.head.querySelectorAll(`script[src="${UI_CHAT_EMBED_URL}"]`)

afterEach(() => {
  embedScripts().forEach((script) => script.remove())
})

describe('isChatbotAvailable', () => {
  it('is true when the chatbot answers with its configuration', async () => {
    server.use(http.post(CONFIG_URL, () => HttpResponse.json({ data: { name: 'x' } })))
    await expect(isChatbotAvailable(SMARTER_DEVELOPER_BOT)).resolves.toBe(true)
  })

  it('is false when the chatbot answers without a configuration', async () => {
    server.use(http.post(CONFIG_URL, () => HttpResponse.json({})))
    await expect(isChatbotAvailable(SMARTER_DEVELOPER_BOT)).resolves.toBe(false)
  })

  it('is false when the chatbot refuses', async () => {
    server.use(http.post(CONFIG_URL, () => new HttpResponse(null, { status: 403 })))
    await expect(isChatbotAvailable(SMARTER_DEVELOPER_BOT)).resolves.toBe(false)
  })

  it('is false when the request fails', async () => {
    server.use(http.post(CONFIG_URL, () => HttpResponse.error()))
    await expect(isChatbotAvailable(SMARTER_DEVELOPER_BOT)).resolves.toBe(false)
  })
})

describe('loadEmbedScript', () => {
  it('adds the embed script once', () => {
    loadEmbedScript()
    loadEmbedScript()
    expect(embedScripts()).toHaveLength(1)
  })
})

describe('SmarterChat', () => {
  it('shows a preview with the example prompts while the chatbot is unavailable', async () => {
    server.use(http.post(CONFIG_URL, () => new HttpResponse(null, { status: 403 })))
    render(<SmarterChat bot={SMARTER_DEVELOPER_BOT} />)

    const preview = screen.getByLabelText('Smarter Developer Guide preview')
    expect(preview).toHaveTextContent(SMARTER_DEVELOPER_BOT.welcome)
    expect(preview).toHaveTextContent('Try asking Sam')
    for (const example of SMARTER_DEVELOPER_BOT.examples) {
      expect(screen.getByText(example)).toBeInTheDocument()
    }
    // still the preview once the chatbot has refused.
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(embedScripts()).toHaveLength(0)
    expect(screen.queryByLabelText('Smarter Developer Guide')).not.toBeInTheDocument()
  })

  it('shows the live chat when the chatbot answers', async () => {
    server.use(http.post(CONFIG_URL, () => HttpResponse.json({ data: { name: 'x' } })))
    render(<SmarterChat bot={SMARTER_DEVELOPER_BOT} />)

    const chat = await screen.findByLabelText('Smarter Developer Guide')
    expect(chat.tagName).toBe('SMARTER-CHAT')
    expect(chat).toHaveAttribute('chatbot', SMARTER_DEVELOPER_BOT.chatbot)
    expect(chat).toHaveAttribute('mode', 'inline')
    expect(chat).toHaveAttribute(
      'session-cookie-name',
      'smarter_chat_session_smarter_developer'
    )
    expect(embedScripts()).toHaveLength(1)
  })

  it('ignores an answer that arrives after it unmounts', async () => {
    let answer = () => {}
    const answered = new Promise<void>((resolve) => (answer = resolve))
    server.use(
      http.post(CONFIG_URL, async () => {
        await answered
        return HttpResponse.json({ data: { name: 'x' } })
      })
    )
    const { unmount } = render(<SmarterChat bot={SMARTER_DEVELOPER_BOT} />)
    unmount()
    answer()

    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(embedScripts()).toHaveLength(0)
  })
})
