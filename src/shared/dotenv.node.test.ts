// @vitest-environment node
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { loadEnv } from './dotenv.ts'

const HERE = dirname(fileURLToPath(import.meta.url))

describe('loadEnv', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'dotenv-test-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
    for (const key of ['DOTENV_A', 'DOTENV_B', 'DOTENV_C', 'DOTENV_D']) {
      delete process.env[key]
    }
  })

  /** loadEnv() resolves its path against src/shared, so pass a relative one. */
  function envFile(content: string): string {
    const path = join(dir, '.env')
    writeFileSync(path, content)
    return relative(HERE, path)
  }

  it('sets variables, strips quotes, and skips comments, blanks and bad lines', () => {
    loadEnv(
      envFile(
        '# a comment\n\nDOTENV_A=plain\nDOTENV_B="double"\nDOTENV_C=\'single\'\nnot a pair\nDOTENV_D = a=b \n'
      )
    )

    expect(process.env.DOTENV_A).toBe('plain')
    expect(process.env.DOTENV_B).toBe('double')
    expect(process.env.DOTENV_C).toBe('single')
    expect(process.env.DOTENV_D).toBe('a=b')
  })

  it('returns quietly when the file does not exist', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    loadEnv(relative(HERE, join(dir, 'missing.env')))

    expect(error).not.toHaveBeenCalled()
  })

  it('logs an error when the file cannot be read', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    // a directory exists but cannot be read as a file
    loadEnv(relative(HERE, dir))

    expect(error).toHaveBeenCalledWith('Error loading .env file:', expect.any(String))
  })
})
