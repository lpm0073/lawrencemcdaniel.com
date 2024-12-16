/*
  This script is invoked from GitHub Actions and is used to update the version of the package.json file.
*/
const fs = require('fs')
const path = require('path')

const packageJsonPath = path.resolve(__dirname, '../../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

const newVersion = process.env.NEXT_VERSION

if (packageJson.version !== newVersion) {
  packageJson.version = newVersion
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
  console.log(`Version updated to ${newVersion}`)
} else {
  console.log('Version is already up to date.')
}
