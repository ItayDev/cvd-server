import { saveParking, isParkingSpotSafe } from './../services/ModelOperations';
import {Router} from 'express';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        await saveParking(req.body.date, req.body.lon, req.body.lon, true);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
})

router.post('/accidant', async (req, res, next) => {
    try {
        await saveParking(req.body.date, req.body.lon, req.body.lat, false);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
})

router.post('/isSafe', async (req, res, next) => {
    try {
        const isSafe = await isParkingSpotSafe(req.body.date, req.body.lon, req.body.lat);
        res.status(200).send(isSafe);
    } catch (e) {
        next(e);
    }
})

export default router;