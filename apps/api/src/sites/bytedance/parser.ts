import * as cheerio from 'cheerio'
import { ByteDanceData } from './type'
/**
 * 解析List中a得到data-id
 * @param html 
 * @param linkId
 */
export const parseDetail = (html: string, linkId: string): ByteDanceData => {
  const $ = cheerio.load(html)
  const title = $('.job-title').text()
  const jobInfoSpans = $('.job-info span')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)
  const jobInfo = jobInfoSpans.join(' | ')
  const description = $('.block-content').text().trim()
  const requirements = $('.block-content').text().trim()
  const location = $('.clamp-content').first().text().trim()

  return {
    id: linkId,
    title,
    jobInfo,
    location,
    description,
    requirements,
    createAt: new Date().toISOString(),
  }
}