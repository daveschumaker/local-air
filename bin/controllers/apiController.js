import fetch from 'node-fetch';
import config from '../../config';
const { sensorId } = config;

const fetchData = async () => {
    try {
        if (!sensorId) {
            console.log('Error: Missing sensorId inside config.js');
            process.exit();
        }

        const endpoint = `https://www.purpleair.com/json?show=${sensorId}`;
        const res = await fetch(endpoint);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
            /**
             * In some cases, PurpleAir can return array of sensor data
             * based on parent / child sensors. For my purposes, I only
             * care about the parent sensor.
             */
            return data.results[0];
        } else {
            return false;
        }
    } catch (err) {
        console.log('Error fetching data');
        console.log(err);

        return false;
    }
};

export { fetchData };
