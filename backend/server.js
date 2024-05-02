const mongoose = require('mongoose');
const app = require('./app');
const dontenv = require('dotenv');
dontenv.config({ path: './config.env' });



const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('db connection successful');
  });

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
