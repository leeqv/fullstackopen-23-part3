require('dotenv').config()

const mongoose = require('mongoose')

if (process.argv.length<3 || process.argv.length===4) {
  console.log('Usage: node mongo.js db-password name number')
  process.exit(1)
}

// const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

// Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Model
const Person = mongoose.model('Person', personSchema)

// Document
const person = new Person({
  name,
  number,
})

if (process.argv.length===3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}