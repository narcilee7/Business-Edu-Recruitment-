import fs from 'fs'
import logger from '../../utils/logger'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const progressFilePath = path.resolve(__dirname, './progress.json')


export const loadProgress = (): number => {
  try {
    if (fs.existsSync(progressFilePath)) {
      const data = fs.readFileSync(progressFilePath, 'utf-8')
      return JSON.parse(data).lastPage || 1
    } else {
      logger.error('progress.json not exists')
      return 1
    }
  } catch (error) {
    logger.error("Failed to load progress.json", error)
    return 1
  }
}

export const saveProgress = (lastPage: number): void => {
  try {
    const currentPage = loadProgress()
    if (currentPage >= lastPage) {
      logger.error("update progress error, currentPage >= lastPage")
      return
    }
    fs.writeFileSync(progressFilePath, JSON.stringify({ lastPage }), 'utf-8')
  } catch (error) {
    logger.error("Failed to save progress.json", error)
    return
  }
}