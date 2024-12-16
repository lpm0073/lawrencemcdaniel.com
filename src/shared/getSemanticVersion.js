import packageJson from '../../package.json'

/**
 * Return the semantic version number.
 *
 * Example valid values of VERSION are:
 * 0.1.17
 * 0.1.17-next.1
 * 0.1.17-next.2
 * 0.1.17-next.123456
 * 0.1.17-next-major.1
 * 0.1.17-next-major.2
 * 0.1.17-next-major.123456
 *
 * Note:
 * - npm does not allow semantic version numbers to contain a dash.
 * - npm does not allow semantic version numbers to contain a 'v' prefix.
 * - npm does not allow semantic version numbers to contain a 'next' suffix.
 */
export function getSemanticVersion() {
  let version = packageJson.version
  version = version.replace(/-next\.\d+/g, '')
  return version.replace(/-next-major\.\d+/g, '')
}
