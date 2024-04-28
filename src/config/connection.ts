import mongoose from 'mongoose'

const connection = async () => {
  try {
    const url: string|undefined = process.env.DB_URL

    console.log('logging url', url)

    await mongoose.connect(`${url}`)

    mongoose.connection.once('open', () => {
      console.log('connection with monogo established successfully')
    })
  } catch (error: any) {
    console.error(error)
  }
}

export { connection }