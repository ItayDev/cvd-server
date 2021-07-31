import { saveParking, isParkingSpotSafe } from './../services/ModelOperations';
import {Router} from 'express';
import { ParkType } from '../models/ParkEvent';

const router = Router();

router.get('/isAlive', async (req, res, next) => {
    res.status(200).send("gooooood!");
})

router.get('/parking', async (req, res, next) => {
    try {
        await saveParking(req.body.date, req.body.lon, req.body.lon, ParkType.SAFE);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
})

router.get('/accident', async (req, res, next) => {
    try {
        const {lon, lat}: Partial<{lon: number, lat: number}> = req.query;
        await saveParking(new Date(), lon, lat, ParkType.ACCIDENT);
        res.status(200).send("accident saved");
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