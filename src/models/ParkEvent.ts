import { Schema, model } from 'mongoose';
import { Point } from 'geojson';

export interface ParkEvent {
    date: Date;
    location: Point;
}

export enum ParkType {
    SAFE="SAFE",
    ACCIDANT="ACCIDANT"
}

const pointSchema = new Schema<Point>({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const parkEventSchema = new Schema<ParkEvent>({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    location: {
        type: pointSchema,
        required: true
    },
    type: {
        type: String,
        enum: [ParkType.SAFE, ParkType.ACCIDANT]
    }
});
export default model<ParkEvent>('ParkEvent', parkEventSchema);