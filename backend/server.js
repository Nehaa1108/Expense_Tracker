const express = require('express')

const app = express()

const {DB,add,sub} = require('./config/DB.js')

const fs = require('fs')
const PORT = 3001


app.get('/',(req,res) => {
  res.send("hey")
})

app.get('/users',(req,res) =>
{
  res.json(DB)
})


console.log('Hello from Node!')
 console.log('Node version:', process.version) 
 console.log('Current folder:', __dirname)

 console.log("-----------------------")
 console.log(add(3,5))
 console.log(sub(10,4))

 console.log('-----------------------')

 const writeFile = fs.writeFileSync('note.txt','this is a note file')

 const readFile = fs.readFileSync('note.txt','utf-8')
 console.log('readFile',readFile)

 const writeFileasync= fs.writeFile('note-async.txt','this is async file ')
console.log('Async file written')

app.listen(PORT,() =>
{
  console.log('Server running on port ' ,`"${PORT}"`)
})
