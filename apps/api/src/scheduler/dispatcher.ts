import { fetchByteDanceJob } from "../sites/bytedance"


export const dispatchAllJobs = async () => {
  try {
    await fetchByteDanceJob()
    console.log('🚀 Jobs dispatched successfully.')
  } catch (error) {
    console.error('Error dispatching jobs:', error)
  }
}