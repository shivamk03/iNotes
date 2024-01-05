const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/MyNoteApp";

const connectToDatabase = async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDatabase;
