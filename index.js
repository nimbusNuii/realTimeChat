const express = require('express')

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/', (req, res) => {
    const { message } = req.body;
    res.status(201).json({ message: "Document inserted", result:message });
})

app.listen(3000, async () =>{
    console.log("App listening on port 3000")
})