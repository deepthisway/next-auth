import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)

        connection.on('connected', ()=> {
            console.log('Connected to MongoDB')
        })
        connection.on('error', (err) => {
            console.error('Error connecting to MongoDB:', err)
        })
        process.exit();

    } catch (error) {
        console.log('something went wrong while connecting to the database');
        console.log(error);
        
    }
}

// giving exclaimation mark after MONGO_URL removes error because that declares, That i ensure that URL is coming and no need to put a check
// no if-else needed.