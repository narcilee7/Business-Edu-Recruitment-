import logger from "../../utils/logger"
import { fetchBaiduList } from "./list"


export const fetchBaidu = async () => {
  logger.info('🚀 Fetching Baidu jobs...')
  try {
    await fetchBaiduList()
  } catch (error) {
    logger.error('Failed to fetch baidu jobs from head', error)
  }
}