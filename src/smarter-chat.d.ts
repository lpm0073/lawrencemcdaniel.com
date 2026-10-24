/**
 * <smarter-chat>: the custom element of @smarter.sh/ui-chat's embed script, which the
 * Smarter Project page loads from jsDelivr (src/pages/smarter/SmarterChat.tsx). Only the
 * attributes the site sets are declared. The import makes this file a module, so that it
 * augments React's JSX types instead of replacing them.
 */
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'smarter-chat': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        chatbot: string
        mode?: 'inline' | 'launcher'
        height?: string
        label?: string
        'session-cookie-name'?: string
      }
    }
  }
}
