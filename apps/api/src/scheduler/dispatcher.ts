import { fetchBaidu } from "../sites/baidu"
import { fetchByteDanceJob } from "../sites/bytedance"


export const dispatchAllJobs = async () => {
  try {
    // await fetchByteDanceJob()
    await fetchBaidu()
    console.log('🚀 Jobs dispatched successfully.')
  } catch (error) {
    console.error('Error dispatching jobs:', error)
  }
}