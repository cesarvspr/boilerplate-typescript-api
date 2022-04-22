import mongoose from 'mongoose'
const mongoUri = process.env.MONGO_URI
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(mongoUri, connectionOptions)

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', () => {
  console.info('Mongo connected')
})