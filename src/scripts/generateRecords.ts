import mongoose from 'mongoose'
import {ParkType} from '../models/ParkEvent'
import {saveParking} from '../services/ModelOperations'

const START_DATE = new Date("2021-07-14")
const END_DATE = new Date("2021-08-05")
const CHANCE_FOR_ACCIDENT = 0.03;
const MAX_PARKS_PER_DAY = 100
const MIN_LAT = 34.830514
const MAX_LAT = 34.927881
const MIN_LON = 32.141380
const MAX_LON = 32.194048

async function generateRecords() {
    let currDay = START_DATE;

    while(currDay < END_DATE) {
        let numOfParks = Math.round(Math.random() * MAX_PARKS_PER_DAY)
        for(let i = 0; i < numOfParks; i++) {
            const [lon, lat] = generateRandomLocation()
            await saveParking(currDay, lon, lat, ParkType.PARKING)

            if(Math.random() < CHANCE_FOR_ACCIDENT) {
                await saveParking(currDay, lon, lat, ParkType.ACCIDENT)
            }
        }

        currDay.setDate(currDay.getDate() + 1)
    }
}

function generateRandomLocation() {
    const lonInterval = (MAX_LON - MIN_LON) * Math.random()
    const latInterval = (MAX_LAT - MIN_LAT) * Math.random()

    return [MIN_LON + lonInterval, MIN_LAT + latInterval]
}

!async function () {
    console.info('Connecting to mongodb server...')
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.t55gn.mongodb.net/CVD");
    console.info('Records are being generated...')
    await generateRecords()
    console.info('Records generated!')
}()