import axios from 'axios'
import cheerio from 'cheerio'

export async function crawlJobPage(url: string) {
  try {
    const res = await axios.get(url)
    const html = res.data
    const $ = cheerio.load(html)

    const jobs = []
    // 
  } catch (error) {
    console.error('爬取失败', error);
    throw error;
  }
}
