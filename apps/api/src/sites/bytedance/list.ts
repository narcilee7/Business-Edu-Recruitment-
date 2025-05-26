import { CHROME_URI } from "../../utils/constants"
import { chromium } from 'playwright'
import logger from "../../utils/logger"
import { ByteDanceData } from "./type";
import { parseDetail } from "./parser";
import { saveData } from "./db";

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

    let pageNum = 1
    let hasNextPage = true

    while (hasNextPage) {
      logger.info(`🚀 Fetching Bytedance jobs page ${pageNum}...`)
      const dataIds = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[data-id]'));
        return links.map(link => link.getAttribute('data-id'));
      })
      if (dataIds && dataIds.length > 0) {
        const result = await fetchDetail(dataIds as string[])
        if (dataIds.length === result.length) {
          await saveData(result)
        }
      } else {
        logger.error('❌ 本页未找到职位ID，结束爬取')
        break
      }

      const isDisabled = await page.evaluate(() => {
        const nextBtn = document.querySelector('.atsx-pagination-next');
        return nextBtn?.classList.contains('atsx-pagination-disabled');
      })

      if (isDisabled) {
        logger.info('✅ 本页已无更多职位，结束爬取')
        break
      } else {
        await page.click('.atsx-pagination-next')
        await page.waitForTimeout(1000)
        await page.waitForSelector('a[data-id]', { timeout: 30000 })
        pageNum++
      }
    }

  } catch (error) {
    logger.error('fetch list error:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

const fetchDetail = async (linkIds: string[]): Promise<ByteDanceData[]> => {
  if (linkIds.length === 0) {
    logger.info('❌ No linkIds provided.')
    return []
  }
  let browser = null
  let page = null
  try {
    browser = await chromium.launch({
      headless: false,
      executablePath: CHROME_URI,
    })
    page = await browser.newPage()
    await page.setViewportSize({ width: 1280, height: 800 });
    let result: ByteDanceData[] = []
    for (const linkId of linkIds) {
      const detailUrl = `https://jobs.bytedance.com/campus/position/${linkId}/detail`
      await page.goto(detailUrl, {
        waitUntil: 'networkidle',
        timeout: 60000,
      })
      await page.waitForSelector('div.block-content', { timeout: 30000 })
      const html = await page.content()
      const detail = parseDetail(html, linkId)
      result.push(detail)
    }
    return result
  } catch (error) {
    logger.error("❌ Detail Error:", error)
    return []
  } finally {
    if (browser) {
      await browser.close()
    }
    if (page) {
      await page.close()
    }
  }
}