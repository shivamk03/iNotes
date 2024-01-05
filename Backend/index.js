const connectToDatabase = require("./dbConnect.js");
const express = require("express");
const cors= require('cors');
connectToDatabase();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
// app.get("/", (req, res) => {
//   res.send("Connected");
// });
app.get('/',(req,res)=>{
  res.send("Working");
})

app.listen(port, () => {
  console.log(`MyNotesApp working on http://localhost:${port}`);
});
