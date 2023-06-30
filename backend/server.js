const app = require('./app');

const dotenv = require('dotenv');
const connectToDB = require('./config/database');

//Config DotEnv file using dotenv module from npn
dotenv.config({ path : './backend/config/config.env' });

//Making Connection of MongoDB Database
connectToDB();

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Listening to the port ${process.env.PORT}`);
})