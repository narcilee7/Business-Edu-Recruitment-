import axios from "axios"
import puppeteer from "puppeteer-core"
import { CHROME_URI } from "../../utils/constants"

/**
 * 爬取列表调度
 */
export async function fetchJobList(page = 1, limit = 10) {
  const url = `https://jobs.bytedance.com/campus/position?current=${page}&limit=${limit}`
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: CHROME_URI
  })
  const newPage = await browser.newPage()

  await newPage.setViewport({
    width: 1280,
    height: 800,
  })

  await newPage.goto(url, { waitUntil: 'networkidle0' })

  await newPage.waitForSelector('.positionItem')

  const jobLinks = await newPage.$$eval('.positionItem a', (links) => {
    return links.map(link => link.href)
  }
  )
  console.log(`第 ${page} 页获取到 ${jobLinks.length} 条职位链接`)

  const results = []

  for (const link of jobLinks) {
    const detailPage = await browser.newPage()
    await detailPage.goto(link, { waitUntil: 'networkidle0' })
    const jobDetail = await detailPage.evaluate(() => {
      const title = document.querySelector('.job-title')?.textContent?.trim() || ''
      const location = document.querySelector('.job-location')?.textContent?.trim() || ''
      // const description = document.querySelector('.job-description')?.innerText || ''
      return { title, location }
    })

    console.log('职位详情：', jobDetail)
    results.push(jobDetail)

    await detailPage.close()
  }

  await newPage.close()
  await browser.close()
}

