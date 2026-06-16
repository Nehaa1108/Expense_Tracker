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


//param
app.get('/users/:id', (req, res) => {
  res.send(req.params.id);
  
  
console.log('req.body',req.body)
console.log("req.header",req.headers)
  console.log("param id",req.params.id)
});

//search query

app.get('/users', (req, res) => {
  res.send(req.query);

  console.log(req.query,"-----")
});

app.get("/user",(req,res)=>
{
  res.json({
    id:5,
    name:'ghu'
  })
})
// client send to server
// req.params
// req.query
// req.body
// req.headers

// server send to client
// res.send()
// res.json()
// res.status()
console.log('Hello from Node!')
 console.log('Node version:', process.version) 
 console.log('Current folder:', __dirname)

 console.log("-----------------------")
 console.log(add(3,5))
 console.log(sub(10,4))

 console.log('-----------------------')

 const writeFile = fs.writeFileSync('note.txt','this is a note file')

//  const readFile = fs.readFileSync('note.txt','utf-8')
//  console.log('readFile',readFile)

//  const writeFileasync= fs.writeFile('note-async.txt','this is async file ')
// console.log('Async file written')
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

greet('name')

app.listen(PORT,() =>
{
  console.log('Server running on port ' ,`"${PORT}"`)
})



//api using thunder ---

//register
// post-- http:localhost:5000/api/auth/register
//body ---json----{username,email,password}

//getMe
//getMe--http:localhost:5000/api/auth/get-me
// header-- key-Authenticatio ,  value -Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzBmNDg3Nzc5MGYwMjQ3ZTg1ZjE1NSIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3ODE1OTMyMjQsImV4cCI6MTc4MTY3OTYyNH0.hL26xkzpUX_08ra9J67F3HXZGL_8c3AmgwuURmE4GPA

