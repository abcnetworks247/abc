const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;

const ConnectDb = (server) => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to the database");
    server.listen(port, console.log(`Server listening to ${port} 🔥🔥`));
  }).catch(() => {
    
  })

};

module.exports = ConnectDb;
