import { fetchData } from './apiController';
import SensorData from '../models/SensorData';
import SensorHistory from '../models/SensorHistory';
import dataStoreController from './dataStoreController';
import notificationController from './notificationController';
import { currentTimeSecs } from '../utils/timeUtils';

// Prevent inadvertently flooding PurpleAir API.
const TIMEOUT_SECONDS = 60;

// Store time of last notification to prevent too many notifications.
let lastEmailNotificationTime = null;

const getCachedData = () => {
    const cachedData = dataStoreController.getData('sensorData');
    return new SensorData(cachedData);
};

const writeSensorData = sensorData => {
    const currentTime = currentTimeSecs();

    if (!sensorData) {
        return;
    }

    sensorData.fetchTime = currentTime;
    dataStoreController.writeData('fetchTime', currentTime);
    dataStoreController.writeData('sensorData', sensorData);
};

const getSensorData = () => {
    return new Promise(resolve => {
        const currentTime = currentTimeSecs();
        const lastFetchTime = dataStoreController.getData('fetchTime');

        if (!lastFetchTime || currentTime - Number(lastFetchTime) > TIMEOUT_SECONDS) {
            fetchData().then(data => {
                if (!data) {
                    return;
                }

                writeSensorData(data);
                resolve(new SensorData(data));
            });
        } else {
            resolve(getCachedData());
        }
    });
};

const sendEmailAlert = () => {
    const AQI_THRESHOLD = 100; // Cutoff threshold to send notifications.
    const NOTIFICATION_TIMEOUT_SECS = 3600; // Only send alert emails once an hour.
    const currentTime = currentTimeSecs();
    const historicalValues = SensorHistory.getHistory();

    if (!historicalValues[0] || historicalValues[1]) {
        return;
    }

    const lastAqiValue = historicalValues[0].value;
    const prevAqiValue = historicalValues[1].value;

    if (!lastAqiValue || !prevAqiValue) {
        return;
    }

    const shouldSendAlert = lastAqiValue >= AQI_THRESHOLD && prevAqiValue < AQI_THRESHOLD;

    if (
        shouldSendAlert &&
        (!lastEmailNotificationTime ||
            currentTime - lastEmailNotificationTime >= NOTIFICATION_TIMEOUT_SECS)
    ) {
        lastEmailNotificationTime = currentTime;
        notificationController.send({
            body: `AQI is ${lastAqiValue}. You should close your windows now.`
        });
    }
};

export { getCachedData, getSensorData, sendEmailAlert, writeSensorData };
