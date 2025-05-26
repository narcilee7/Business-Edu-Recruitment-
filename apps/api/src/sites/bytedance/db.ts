import { ByteDanceData } from "./type"
import { ByteDanceJobModel } from "./schema"
import logger from "../../utils/logger"


export const saveData = async (data: ByteDanceData[]) => {
  try {
    const bulkOps = data.map(item => ({
      updateOne: {
        filter: { id: item.id },
        update: { $set: item },
        upsert: true,
      }
    }))
    await ByteDanceJobModel.bulkWrite(bulkOps)
    logger.info(`Update ${data.length} jobs to database`)
  } catch (error) {
    logger.error('Failed to save data to database', error)
  }
}