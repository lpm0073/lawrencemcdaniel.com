import { wpGetFeaturedImage } from '../wpGetFeaturedImage.js'
import type { WPPost } from '../../types'

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
 * Returns a list of schema.org skill objects for the specialties, optionally
 * only those with a skill.
 * @param specialties - the specialties, e.g. useSpecialties().data.items.
 * @param skillName - a skill slug to filter by, e.g. APP_CONFIG.skills.react.
 * @returns Array of schema.org DefinedTerm objects.
 */
export const gsdSkillSchemaList = (specialties: WPPost[], skillName?: string) => {
  const skills = specialties

  const filteredSkills = skillName
    ? skills.filter((skill) => skill.skills && skill.skills.includes(skillName))
    : skills

  return filteredSkills.map((skill) => gsdSkillSchema(skill))
}
