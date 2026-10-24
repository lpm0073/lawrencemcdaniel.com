/*
  This script is invoked from GitHub Actions and is used to update the version of the package.json file.
  called as: `node ./src/shared/updateVersion.ts ${{ env.NEXT_VERSION }}`
*/
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import semver from 'semver'

interface PackageJson {
  version: string
  [key: string]: unknown
}

/**
 * Sets package.json's version to newVersion, and verifies it. Exits 0 without
 * changes when newVersion is empty, and exits 1 when it is not valid semver.
 */
export function main(
  newVersion: string | undefined,
  packageJsonPath: string = path.resolve(import.meta.dirname, '../../package.json')
): void {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as PackageJson

  if (!newVersion) {
    console.log('NEXT_VERSION is not defined. Skipping version update.')
    process.exit(0)
  }

  if (!semver.valid(newVersion)) {
    console.error(`Error: ${newVersion} is not a valid semantic version.`)
    process.exit(1)
  }

  if (packageJson.version !== newVersion) {
    packageJson.version = newVersion
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
    console.log(`Version updated to ${newVersion}`)

    // Verify the update
    const updatedPackageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf8')
    ) as PackageJson
    if (updatedPackageJson.version === newVersion) {
      console.log(`Verified: package.json version is ${newVersion}`)
    } else {
      console.error(
        `Verification failed: package.json version is ${updatedPackageJson.version}`
      )
      process.exit(1)
    }
  } else {
    console.log('Version is already up to date.')
  }
}

// Run main() only when Node runs this file directly (node <file>.ts), not when a test imports it.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main(process.argv[2])
