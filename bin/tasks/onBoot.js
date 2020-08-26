import { fetchData } from '../controllers/apiController';
import { writeSensorData } from '../controllers/sensorDataController';

/**
 * Fetch latest data from Purple Air sensors when
 * app boots up, rather than waiting 5 minutes for
 * cron job start.
 */

const run = async () => {
    try {
        let sensorData = await fetchData();

        if (!sensorData) {
            return;
        }

        writeSensorData(sensorData);
    } catch (err) {
        console.log('onBoot error:');
        console.log(err);

        return;
    }
};

export default {
    run
};
