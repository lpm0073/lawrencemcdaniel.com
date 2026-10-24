import { useEffect, useState } from 'react'

import {
  isChatbotAvailable,
  loadEmbedScript,
  type SmarterChatbot,
} from './smarterChatEmbed'

/** What the chat looks like, with its example prompts, for when it can't be reached. */
const ChatPreview = ({ bot }: { bot: SmarterChatbot }) => (
  <div className="smarter-chat-preview" aria-label={bot.appName + ' preview'}>
    <div className="smarter-chat-preview-header">
      <span className="smarter-chat-preview-avatar" aria-hidden="true">
        <i className="fa fa-comments"></i>
      </span>
      <div>
        <div className="smarter-chat-preview-title">{bot.appName}</div>
        <div className="smarter-chat-preview-subtitle">Built and run on Smarter</div>
      </div>
    </div>
    <div className="smarter-chat-preview-body">
      <div className="smarter-chat-preview-bubble">{bot.welcome}</div>
      <div className="smarter-chat-preview-label">Try asking {bot.assistant}</div>
      <ul className="list-unstyled mb-0">
        {bot.examples.map((example) => (
          <li key={example} className="smarter-chat-preview-example">
            {example}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

/**
 * A Smarter chatbot, inline in the page: the live chat if the deployed chatbot answers,
 * and a preview of it otherwise.
 */
export default function SmarterChat({
  bot,
  height = '600px',
}: {
  bot: SmarterChatbot
  height?: string
}) {
  const [live, setLive] = useState(false)

  useEffect(() => {
    let active = true
    void isChatbotAvailable(bot).then((available) => {
      if (!active || !available) return
      loadEmbedScript()
      setLive(true)
    })
    return () => {
      active = false
    }
  }, [bot])

  if (!live) return <ChatPreview bot={bot} />
  return (
    <smarter-chat
      chatbot={bot.chatbot}
      mode="inline"
      height={height}
      label={bot.appName}
      aria-label={bot.appName}
      session-cookie-name={'smarter_chat_session_' + bot.name}
    />
  )
}
