import cron from 'cron';
import { getSensorData, sendEmailAlert } from '../controllers/sensorDataController';
import SensorHistory from '../models/SensorHistory';

const CronJob = cron.CronJob;
const tenMinuteJob = new CronJob(
    '0 */10 * * * *',
    async () => {
        try {
            const sensorData = await getSensorData();
            SensorHistory.addHistory(sensorData.currentPM25);
            sendEmailAlert();
        } catch (err) {
            console.log('Some error occurred...');
            console.log(err);
        }
    },
    null,
    true,
    'America/Los_Angeles'
);

export default {
    run() {
        tenMinuteJob.start();
    }
};
