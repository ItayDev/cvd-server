import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, {connection} from 'mongoose';
import parkingRouter from './routes/ParkingRouter';

const LISTEN_PORT = 3000;
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use("/park", parkingRouter);
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send("Internal server error");
})


mongoose.connect("some-connection-string");

connection.on('open', () => {
    console.info('Connected to mogodb server...')
    app.listen(LISTEN_PORT, () => {
        console.info(`Server running on port ${LISTEN_PORT}`);
    })
})

connection.on('error', () => {
    console.error('Failed to connect to a mongodb server. Aborting...');
})