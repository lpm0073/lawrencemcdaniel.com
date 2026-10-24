import { useSelector } from 'react-redux'
import { wpGetFeaturedImage } from '../wpGetFeaturedImage.js'
import type { RootState } from '../../redux/configureStore'
import type { WPPost } from '../../types'
//import { APP_CONFIG } from '../constants.js'

const stripHtml = (html: string): string => html.replace(/<[^>]+>/g, '')

/**
 * Generates a schema.org DefinedTerm object for a technology skill.
 * @param {string} name - The name of the skill (e.g., "Python").
 * @param {string} description - A 1-line description of the skill.
 * @param {string} url - The main website URL for the technology.
 * @returns {object} Schema.org DefinedTerm object.
 */
export const gsdSkillSchema = (skill: WPPost) => {
  return {
    '@type': 'DefinedTerm',
    '@id': stripHtml(skill.title.rendered) + '#skill',
    name: stripHtml(skill.title.rendered),
    description: stripHtml(skill.excerpt.rendered),
    url: skill.acf?.url,
    subjectOf: skill.acf?.url,
    image: wpGetFeaturedImage(skill),
    inDefinedTermSet: 'https://schema.org/DefinedTerm',
  }
}

/**
 * Returns a list of schema.org skill objects from Redux state.
 * Optionally filters by skill name.
 * Assumes Redux state shape: { skills: [{ name, description, url }, ...] }
 * @param {string} [skillName] - Optional skill name to filter by.
 * @returns {Array} Array of schema.org DefinedTerm objects.
 */
export const gsdSkillSchemaList = (skillName?: string) => {
  // This is only called while a function component renders, so the hook is safe;
  // the name cannot change without changing the export.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const reduxSkills = useSelector((state: RootState) => state.specialties)
  const skills = reduxSkills ? reduxSkills.items : []

  const filteredSkills = skillName
    ? skills.filter((skill) => skill.skills && skill.skills.includes(skillName))
    : skills

  return filteredSkills.map((skill) => gsdSkillSchema(skill))
}
