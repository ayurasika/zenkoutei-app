import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import chatRouter from './api/chat.js'

const app = express()
const PORT = 3001

// CORS設定
app.use(cors())
app.use(express.json())

// APIルート
app.use('/api', chatRouter)

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
