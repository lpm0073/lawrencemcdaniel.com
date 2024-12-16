import React from 'react'
import Cookies from 'js-cookie'

const CookieSetter = () => {
  const setCookie = () => {
    Cookies.set('key', 'value', { sameSite: 'Lax', secure: true })
  }

  return (
    <div>
      <button onClick={setCookie}>Set Cookie</button>
    </div>
  )
}

export default CookieSetter
