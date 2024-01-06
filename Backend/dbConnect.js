const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://kambojshivam035:vTh4ggN92GxBru4O@notescluster.hhi0c8o.mongodb.net/?retryWrites=true&w=majority";

const connectToDatabase = async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDatabase;
