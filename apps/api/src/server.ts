import app from './app'
import { PORT } from './config'
import { dispatchAllJobs } from './scheduler/dispatcher'
import { connectDB } from './utils/db'

await connectDB()

await dispatchAllJobs()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})