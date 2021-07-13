import { Point } from 'geojson';
import circleToPolygon from 'circle-to-polygon';
import ParkEventModel, { ParkType } from '../models/ParkEvent';

const NUM_OF_EDGES = 32;
const RADIUS = 20;

export const saveParking = (date: Date, lon: number, lat: number, isSafe: boolean) => {
    const location: Point = {type: 'Point', coordinates: [lon, lat]};
    const event = new ParkEventModel({
        date,
        location,
        type: isSafe? ParkType.SAFE : ParkType.ACCIDANT
    });
    return event.save();
}

export const isParkingSpotSafe = async (date: Date, lon: number, lat: number) => {
    date.setMonth(date.getMonth() - 1);
    const expandedParkingSpot = circleToPolygon([lon, lat], RADIUS, NUM_OF_EDGES);
    const hits = await ParkEventModel.find({
        type: {
            $eq: ParkType.ACCIDANT
        },
        date: {
            $gte: date
        },
        location: {
            $geoWithin: {
              $geometry: expandedParkingSpot
            }
          }
    })

    return hits.length == 0;
}