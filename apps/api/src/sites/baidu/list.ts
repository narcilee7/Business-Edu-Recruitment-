import { Browser, chromium } from "playwright"
import logger from "../../utils/logger"
import { CHROME_URI } from "../../utils/constants"


/**
 * 获取百度职位列表
 * list -> detail BFS
 * 百度是SPA，我们点击下一页下一页这样做
 */
export const fetchBaiduList = async () => {
  let browser: Browser | null = null
  let page = null
  try {
    browser = await chromium.launch({
      headless: false,
      executablePath: CHROME_URI
    })
    page = await browser.newPage()
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('https://talent.baidu.com/jobs/list', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    })
    const html = await page.content()
    console.log(html)

    let checkButton = null

    /**
     * <div class="recruit-type__jWLqu">
        <div class="campus__m6dja active__BXKZb">校园招聘</div>
        <div class="intern__gqVaX">实习生招聘</div>
       </div>
     */
    // 先爬取校园招聘下的内容
    checkButton = await page.$('div.campus__m6dja')
    if (checkButton) {
      await checkButton.click()
    }
    await page.waitForTimeout(1000)

  } catch (error) {
    logger.error('Failed to fetch baidu list.', error)
  } finally {
    // if (browser) {
    //   await browser.close()
    // }
  }
}

