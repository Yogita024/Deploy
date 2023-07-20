import mongoose from "mongoose";
import dotenv from 'dotenv';

const Connection =()=>
{   dotenv.config()
    const DB_URI =`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-2wcjthi-shard-00-00.l3kw7sf.mongodb.net:27017,ac-2wcjthi-shard-00-01.l3kw7sf.mongodb.net:27017,ac-2wcjthi-shard-00-02.l3kw7sf.mongodb.net:27017/?ssl=true&replicaSet=atlas-gl0069-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
           mongoose.connect(DB_URI,{ useNewUrlParser: true });
           console.log('Database connected succesfully');
    } catch(error)
    {
        console.log('Error while connecting with the database',error.message);
    }
}
export default Connection;