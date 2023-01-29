require('dotenv').config();
const mongoose = require('mongoose');
const dbPassword = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://owen:${dbPassword}@cluster0.23a4d.mongodb.net/schedule_db?retryWrites=true&w=majority`;

function connect() {
  mongoose.set('strictQuery', false);
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', () => console.error('Connection to MongoDB failed.'));
  db.once('open', () => {
    console.log('Successfully connected to MongoDB');
  });
}

module.exports = { connect };
