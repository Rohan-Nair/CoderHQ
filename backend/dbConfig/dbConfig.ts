import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('open', () => {
            console.log('Connected to Mongo');
        });

        connection.on('error', (err) => {
            console.log('Error connecting to MongoDB');
        });
    } catch (error) {
        console.log('Error connecting to MongoDB');
    }
}