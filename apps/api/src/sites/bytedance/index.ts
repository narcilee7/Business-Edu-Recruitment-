import { JobModel } from "../../models/job"
import axios from "axios"
import * as cheerio from "cheerio"
import { ByteDanceUrl } from "./constants";
import logger from "../../utils/logger";
import { fetchJobList } from "./list";



export const fetchByteDanceJob = async () => {
  logger.info('🚀 Fetching Bytedance jobs...')
  let page = 1, limit = 10
  while (true) {
    await fetchJobList(page, limit)
    page++
  }

}