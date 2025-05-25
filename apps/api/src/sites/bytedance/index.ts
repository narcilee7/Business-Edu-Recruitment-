import { JobModel } from "../../models/job"
import axios from "axios"
import * as cheerio from "cheerio"
import { ByteDanceUrl } from "./constants";
import logger from "../../utils/logger";



export const fetchByteDanceJob = async () => {
  logger.info('🚀 Fetching Bytedance jobs...')

  const headUrl = ByteDanceUrl

  const html = await axios.get(headUrl)
  const $ = cheerio.load(html.data)
}