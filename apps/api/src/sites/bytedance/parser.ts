import * as cheerio from 'cheerio'

/**
 * 解析List中a得到data-id
 */
export const parseList = (html: string): string[] => {
  const result: string[] = []

  try {
    console.log('🚀 html', html);
    const $ = cheerio.load(html)
    // const aList = $('.potion-item')
    // console.log('🚀 aList', aList.text());
  } catch (error) {

  }
  return result
}

export const parseDetail = (html: string): string => {
  return ''
}