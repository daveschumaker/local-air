/* eslint-disable camelcase */
import calcAqi from '../utils/calcAqi';

function SensorData({
    PM2_5Value = '',
    temp_f = '',
    humidity = '',
    pressure = '',
    fetchTime = '',
    Stats = {}
} = {}) {
    this.fetchTime = Number(fetchTime) * 1000;
    this.currentTemp = Math.floor(Number(temp_f));
    this.currentHumidity = Math.floor(Number(humidity));
    this.currentPressure = Math.floor(Number(pressure));

    const stats = JSON.parse(Stats);

    // For some reason, all values need to be multiplied by 3.
    this.currentPM25 = Math.floor(calcAqi(Number(PM2_5Value)));
    this.avg10Min = Math.floor(calcAqi(Number(stats.v1)));
    this.avg30Min = Math.floor(calcAqi(Number(stats.v2)));
    this.avg1Hr = Math.floor(calcAqi(Number(stats.v3)));
    this.avg6Hr = Math.floor(calcAqi(Number(stats.v4)));
    this.avg1Day = Math.floor(calcAqi(Number(stats.v5)));
}

export default SensorData;
