const express = require("express");
const db = require('./config/db');
const app = express();
const cors = require('cors');
const port = 7000;


app.use(cors());

require("./routes/server.routes")(app);

app.use('/images', express.static('public'));

app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});




