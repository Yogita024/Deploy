import mongoose from "mongoose";
import dotenv from 'dotenv';

const Connection =()=>
{   dotenv.config()
  
    const DB_URI =`mongodb://${USERNAME}:${PASSWORD}';
    try{
           mongoose.connect(DB_URI,{ useNewUrlParser: true });
           console.log('Database connected succesfully');
    } catch(error)
    {
        console.log('Error while connecting with the database',error.message);
    }
}
export default Connection;