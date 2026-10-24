/**
 * Minimal declarations for third-party modules that ship no types and have no
 * @types package. Only what the site uses is declared.
 */

/** react-mdr: the Matrix digital rain effect (a <canvas>). */
declare module 'react-mdr' {
  import type { JSX } from 'react'

  export interface MatrixRainingLettersProps {
    /** The rain's color; '#0F0' by default. */
    color?: string
    /** Added to the canvas's className, after 'mrl-container'. */
    custom_class?: string
  }

  export function MatrixRainingLetters(props: MatrixRainingLettersProps): JSX.Element
}
