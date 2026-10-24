import { useEffect, useState } from 'react'

import { DELETING_MS, HOLD_MS, ROLES, TYPING_MS } from './roles'

/**
 * A Courier line that types each of ROLES, holds it, deletes it and types the
 * next. The first render shows ROLES[0] in full, so that the prerendered html
 * matches the first render in the browser; the animation starts after mounting,
 * and not at all for a visitor who asks for reduced motion. Screen readers get
 * the whole list once, instead of every keystroke.
 */
const RoleTyper = () => {
  const [text, setText] = useState(ROLES[0])

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let role = 0
    let shown = ROLES[0].length
    let deleting = true
    let timer: ReturnType<typeof setTimeout>

    const step = () => {
      if (deleting) {
        shown -= 1
        if (shown === 0) {
          deleting = false
          role = (role + 1) % ROLES.length
        }
      } else {
        shown += 1
      }
      setText(ROLES[role].slice(0, shown))
      const typedAll = !deleting && shown === ROLES[role].length
      if (typedAll) deleting = true
      timer = setTimeout(step, typedAll ? HOLD_MS : deleting ? DELETING_MS : TYPING_MS)
    }

    timer = setTimeout(step, HOLD_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <p className="home-roles">
      <span className="visually-hidden">{ROLES.join(', ')}</span>
      <span aria-hidden="true" data-testid="home-roles-typed">
        <span className="home-roles-prompt">&gt; </span>
        {text}
        <span className="home-roles-cursor"></span>
      </span>
    </p>
  )
}

export default RoleTyper
