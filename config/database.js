const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

const connection = async function main() {
  await mongoose.connect(mongoDB);
};

module.exports = connection;
