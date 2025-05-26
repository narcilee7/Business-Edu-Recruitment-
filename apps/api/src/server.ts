import app from './app'
import { PORT } from './config'
import { dispatchAllJobs } from './scheduler/dispatcher'
import { initAndConnDB } from './utils/db'

await initAndConnDB()

await dispatchAllJobs()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})