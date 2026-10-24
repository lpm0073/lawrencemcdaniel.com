/**
 * Loading Smarter Chat, the chat of a Smarter chatbot, into a page: the embed script of
 * @smarter.sh/ui-chat, and the check that the chatbot answers this site. Ported from
 * smarter.sh's SmarterChatEmbed.
 */

/** The version of @smarter.sh/ui-chat whose embed script the page loads. */
export const UI_CHAT_VERSION = '0.36.1'
export const UI_CHAT_EMBED_URL = `https://cdn.jsdelivr.net/npm/@smarter.sh/ui-chat@${UI_CHAT_VERSION}/dist/embed.js`

export interface SmarterChatbot {
  /** Names the cookie that keeps the chat's session. */
  name: string
  /** The deployed chatbot's url, which allows this site in its manifest's allowedOrigins. */
  chatbot: string
  appName: string
  assistant: string
  welcome: string
  examples: string[]
}

/**
 * Adds the embed script of @smarter.sh/ui-chat to the page, once. Without a data-chatbot
 * attribute it only defines the <smarter-chat> element, which SmarterChat renders.
 */
export function loadEmbedScript(doc: Document = document): void {
  if (doc.querySelector(`script[src="${UI_CHAT_EMBED_URL}"]`)) return
  const script = doc.createElement('script')
  script.src = UI_CHAT_EMBED_URL
  script.async = true
  doc.head.appendChild(script)
}

/**
 * Whether the deployed chatbot answers this site: the request the chat itself makes
 * first, a POST to its config/ endpoint. It fails where the chatbot doesn't allow the
 * page's origin, e.g. on the dev server.
 */
export async function isChatbotAvailable(bot: SmarterChatbot): Promise<boolean> {
  try {
    const response = await fetch(new URL('config/', bot.chatbot), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    if (!response.ok) return false
    const json = (await response.json()) as { data?: unknown }
    return Boolean(json.data)
  } catch {
    return false
  }
}
