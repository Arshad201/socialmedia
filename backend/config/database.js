const mongoose = require('mongoose');

const connectToDB = async()=>{
    
    try {

        const {connection} = await mongoose.connect(process.env.URI, {});
        console.log(`Connect to Database with ${connection.host} Successfully!`); 

    } catch (error) {
        console.log(error);
    } 

}

module.exports = connectToDB;