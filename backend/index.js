//get the function name from the db.js file which is exported
const connectToMongo = require("./db");
//run the function call
connectToMongo();
//install the express and load the nodejs application
const express = require("express");
const app = express();
const port = 5000;
var cors = require('cors')

app.use(cors())
app.use(express.json()); 
//middle ware to use json
//Available routes

// app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/demo"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo",require("./routes/todotask"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
