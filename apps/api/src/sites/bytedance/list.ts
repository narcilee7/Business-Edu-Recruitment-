import { CHROME_URI } from "../../utils/constants"
import { chromium } from 'playwright'
import logger from "../../utils/logger"

/**
 * 爬取列表调度
 * list-url = https://jobs.bytedance.com/api/v1/position/list?current=${page}&limit=${limit}
 */
/**
 * 1. 爬取list
 * 2. 解析每个a标签获取data-id data-id="7501984182647130375"
 * 3. 再请求 https://jobs.bytedance.com/campus/position/7501984182647130375/detail
 * 4. 存储db
 */

export async function fetchJobList() {
  let browser = null;
  let page = null;
  try {
    browser = await chromium.launch({
      headless: false,
      executablePath: CHROME_URI,
    })
    page = await browser.newPage()
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('https://jobs.bytedance.com/campus/position', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })
    await page.waitForSelector('a[data-id]', { timeout: 30000 })
    const dataIds = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[data-id]'));
      return links.map(link => link.getAttribute('data-id'));
    })
    if (dataIds && dataIds.length > 0) {
      const result = await fetchDetail(dataIds as string[])
    }
  } catch (error) {
    console.error('fetch list error:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

const fetchDetail = async (linkIds: string[]) => {
  if (linkIds.length === 0) {
    logger.info('❌ No linkIds provided.')
    return
  }
  let browser = null
  let page = null
  try {
    browser = await chromium.launch({
      headless: false,
      slowMo: 1000,
      executablePath: CHROME_URI,
    })
    page = await browser.newPage()
    await page.setViewportSize({ width: 1280, height: 800 });
    for (const linkId of linkIds) {
      const detailUrl = `https://jobs.bytedance.com/campus/position/${linkId}/detail`
      await page.goto(detailUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
    }
  } catch (error) {
    console.log("❌ Detail Error:", error)
  }
}