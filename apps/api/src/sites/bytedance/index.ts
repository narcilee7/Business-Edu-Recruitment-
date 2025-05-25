import logger from "../../utils/logger";
import { fetchJobList } from "./list";


export const fetchByteDanceJob = async () => {
  logger.info('🚀 Fetching Bytedance jobs...')
  await fetchJobList()
}