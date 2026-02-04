const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
const MentorshipRoutes = require('./routes/MentorRoutes')
const UserRoutes = require('./routes/UserRoutes')

app.use('/mentorships', MentorshipRoutes)
app.use('/users', UserRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`))
