import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage('./dataStore');

const writeData = (key, data) => {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(key, jsonString);
};

const getData = key => {
    const dataToParse = localStorage.getItem(key);
    return JSON.parse(dataToParse);
};

export default { getData, writeData };
