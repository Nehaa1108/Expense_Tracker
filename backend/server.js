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

 const writeFile1 = fs.writeFileSync('notes.txt',`"$this is sync file message

 <h1>this is heading file</h1>
  "`)

  const readFile = fs.readFile('note.txt','utf8',(err,data)=>
  {
    if(err)
    {
      console.log('err',err)
      return
    }
    const datastorage = data
    console.log('data',datastorage)
  }
  )
// async use callbakc 
// sync dont use callback

try{
 const readFile1 = fs.readFileSync('notes.txt','utf8')
 console.log(readFile1)
}
catch(err)
{
  console.log("err",err)
}
 

var name = 'john'

function greet(name)
{
  console.log("name--",`${name}`)
}

greet(name)

app.listen(PORT,() =>
{
  console.log('Server running on port ' ,`"${PORT}"`)
})
