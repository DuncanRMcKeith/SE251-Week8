const express = require(`express`)
const app = express()
const fs = require(`fs`);
const hbs = require(`hbs`);
app.set('view engine', 'hbs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/favicon.ico', (req, res) => res.status(204));
hbs.registerPartials(__dirname + '/views/partials', function (err) {});


const readFile = (path)=>{
  return new Promise(
    (resolve, reject)=>
    {
      fs.readFile(path, `utf8`, (err, data) => {
        if (err) {
         reject(err)
        }
        else
        {
          resolve(data)
        }
      });
    })
}

app.get(`/`, (req, res)=>{
  const filePath = path.join(__dirname, `public`, `start.html`)
  res.sendFile(filePath);
})

app.get('/scores', async (req, res) => {
  var data = await readFile(`./data/scores.json`);
  res.json(JSON.parse(data));
  });

app.post('/addscore', async (req, res) => { 
    var oldData =  await readFile(`./data/scores.json`)
    var newData =  await JSON.parse(oldData)
    
    var newname = req.body.playername
    var newscore = Number(req.body.playerscore)

    if (isNaN(newscore)) {
      return res.status(400).send("Invalid Score") //shouldn't pop up, but here just in case something goes wrong
    }

    newData.push({
      name: newname,
      score: newscore
    })

    //sort scoreboard highest to lowest
    newData.sort((a,b) => b.score - a.score)

    //keep top 5 scores in the list
    newData = newData.slice(0,5)

    const jsonString = JSON.stringify(newData);
    await fs.writeFile('./data/scores.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    });
    res.send(jsonString);
});

//Start up the server on port 3000.
var port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server Running at Localhost:3000")
})