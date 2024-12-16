/*
  This script is invoked from GitHub Actions and is used to update the version of the package.json file.
  called as: `node ./src/shared/updateVersion.js ${{ env.NEXT_VERSION }}`
*/
const fs = require('fs')
const path = require('path')
const semver = require('semver')

const packageJsonPath = path.resolve(__dirname, '../../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

const newVersion = process.argv[2]

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
  const updatedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
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
