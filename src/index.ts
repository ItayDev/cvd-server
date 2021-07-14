import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { connection } from 'mongoose';
import parkingRouter from './routes/ParkingRouter';

const LISTEN_PORT = 3000;
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use("/park", parkingRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal server error");
})

app.listen(LISTEN_PORT, () => {
    console.info(`Server running on port ${LISTEN_PORT}`);
})

!async function () {
    console.info('Connecting to mongodb server...')
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.t55gn.mongodb.net/CVD");
    console.info('Connected to mongodb server...')
}();
