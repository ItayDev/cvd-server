import { saveParking, isParkingSpotSafe } from './../services/ModelOperations';
import {Router} from 'express';
import { ParkType } from '../models/ParkEvent';

const router = Router();

router.get('/isAlive', async (req, res, next) => {
    res.status(200).send("gooooood!");
})

router.post('/', async (req, res, next) => {
    try {
        const now = new Date();
        await saveParking(now, req.body.lon, req.body.lon, ParkType.SAFE);
        const isSafe = await isParkingSpotSafe(now, req.body.lon, req.body.lat);
        res.status(200).send(isSafe);
    } catch (e) {
        next(e);
    }
})

router.post('/accident', async (req, res, next) => {
    try {
        await saveParking(new Date(), req.body.lon, req.body.lat, ParkType.ACCIDANT);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
})

router.post('/isSafe', async (req, res, next) => {
    try {
        const isSafe = await isParkingSpotSafe(new Date(), req.body.lon, req.body.lat);
        res.status(200).send(isSafe);
    } catch (e) {
        next(e);
    }
})

export default router;