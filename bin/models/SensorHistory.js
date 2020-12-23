import dataStoreController from '../controllers/dataStoreController';

// On initial load, fetch history from data store,
// otherwise load with an empty array.
let history = dataStoreController.getData('history') || [];
const HISTORY_TO_KEEP = 144;

const addHistory = pm25Value => {
    const currentTime = Date.now();
    history.unshift({ timestamp: currentTime, value: pm25Value });
    history = history.slice(0, HISTORY_TO_KEEP);
    dataStoreController.writeData('history', history);
};

const getHistory = () => {
    return history;
};

export default { addHistory, getHistory };
