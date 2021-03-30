
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8080
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const formidable = require('formidable');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = 'project';
const url = `mongodb://localhost:27017/${DATABASE_NAME}`;

let db = null;
let collection = null;

MongoClient.connect(url, function (err, client) {
  db = client.db(DATABASE_NAME);
  collection = db.collection('Image');
  console.log("Connected successfully");
})

app.use(express.static('file'))

//I listen for socket connection
io.on('connect', (socket) => {
  //Once a user is connected I wait for him to send me figure on the event 'send_figure' or line with the event 'send_line'
  console.log('New connection')
  socket.on('send_figure', (figure_specs) => {
    //Here I received the figure specs, all I do is send back the specs to all other client with the event share figure
    socket.broadcast.emit('share_figure', figure_specs)
  })

  socket.on('send_line', (line_specs) => {
    //Here I received the line specs, all I do is send back the specs to all other client with the event share line
    socket.broadcast.emit('share_line', line_specs)
  })
})

const insertfigure = async (name, date, url) => {
  const doc = {
    name: name,
    date: date,
    url: url
  };
  const result = await collection.insertOne(doc);
  console.log(`Document id: ${result.insertedId}`);
}

app.post('/savemongo', jsonParser, (req, res) => {
  insertfigure(req.body.name, req.body.date, req.body.url)
  const image = req.body.url.replace(/^data:image\/\w+;base64,/, "")
  const buffer = Buffer.from(image, "base64")
  const filename = (req.body.date + req.body.name)
  fs.writeFile("./myimages/" + filename + ".png", buffer, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");

  });   
})

app.get('/savedfile', jsonParser, async (req, res) => {
  var database = [];

  const cursor = await collection.find({}).toArray()
  for (const line of cursor) {
    path = {
      url: line.url,
      name: line.name,
      id: line._id
    }
    database.push(path)
  }
  res.send(
    database.map((product, index )=> 
      `<img id='${product.id}' src='${product.url}'/><br>
        <p> This drawing were made by ${product.name} </p>
        <p> Here is the link to open the image </p>
        <button id='${index}' onclick="myFunction${index}()">Click me.</button>
        <script>
        function myFunction${index}(){
          windows = window.open()
          const drawing = document.getElementById('${product.id}').src
          windows.document.write('<img src="'+drawing+'"/>')
          
        }
        </script>
      `
    ).join('')
  )
})


http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})