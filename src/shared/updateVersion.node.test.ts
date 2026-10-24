// @vitest-environment node
import fs, { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { main } from './updateVersion.ts'

class Exit extends Error {
  code: number | string | null | undefined
  constructor(code: number | string | null | undefined) {
    super(`process.exit(${code})`)
    this.code = code
  }
}

describe('updateVersion main', () => {
  let dir: string
  let packageJsonPath: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'update-version-test-'))
    packageJsonPath = join(dir, 'package.json')
    writeFileSync(packageJsonPath, JSON.stringify({ name: 'x', version: '1.0.0' }))
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Exit(code)
    })
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  const version = () =>
    (JSON.parse(readFileSync(packageJsonPath, 'utf8')) as { version: string }).version

  it('exits 0 without a version', () => {
    expect(() => main(undefined, packageJsonPath)).toThrow(new Exit(0))
    expect(version()).toBe('1.0.0')
  })

  it('exits 1 for an invalid version', () => {
    expect(() => main('not-a-version', packageJsonPath)).toThrow(new Exit(1))
    expect(version()).toBe('1.0.0')
  })

  it('writes and verifies a new version', () => {
    main('1.2.3', packageJsonPath)

    expect(version()).toBe('1.2.3')
    expect(readFileSync(packageJsonPath, 'utf8')).toMatch(/\n$/)
    expect(console.log).toHaveBeenCalledWith('Verified: package.json version is 1.2.3')
  })

  it('does nothing when the version is current', () => {
    main('1.0.0', packageJsonPath)

    expect(console.log).toHaveBeenCalledWith('Version is already up to date.')
  })

  it('exits 1 when the written version does not verify', () => {
    const read = fs.readFileSync
    let reads = 0
    vi.spyOn(fs, 'readFileSync').mockImplementation(((
      ...args: Parameters<typeof read>
    ) => {
      reads += 1
      return reads === 1 ? read(...args) : JSON.stringify({ version: '9.9.9' })
    }) as typeof read)

    expect(() => main('1.2.3', packageJsonPath)).toThrow(new Exit(1))
    expect(console.error).toHaveBeenCalledWith(
      'Verification failed: package.json version is 9.9.9'
    )
  })
})
