/**
 *
 * Converstion values to go from PM25 concentration to AQI.
 * This results in a slightly different value than what PurpleAir returns,
 * but is usually within 3 - 5 integers of their value. Not sure why this is.
 * I use the AQI equation from here:
 * https://forum.airnowtech.org/t/the-aqi-equation/169
 */
const breakPoints = value => {
    let obj = {};

    if (value <= 12) {
        obj.cLo = 0;
        obj.cHi = 12;
        obj.aLo = 0;
        obj.aHi = 50;
    } else if (value <= 35.4) {
        obj.cLo = 12.1;
        obj.cHi = 35.4;
        obj.aLo = 51;
        obj.aHi = 100;
    } else if (value <= 55.4) {
        obj.cLo = 35.5;
        obj.cHi = 55.4;
        obj.aLo = 101;
        obj.aHi = 150;
    } else if (value <= 150.4) {
        obj.cLo = 55.5;
        obj.cHi = 150.4;
        obj.aLo = 151;
        obj.aHi = 200;
    } else if (value <= 250.4) {
        obj.cLo = 150.5;
        obj.cHi = 250.4;
        obj.aLo = 201;
        obj.aHi = 300;
    } else {
        obj.cLo = 250.5;
        obj.cHi = 500.4;
        obj.aLo = 301;
        obj.aHi = 500;
    }

    return obj;
};

const calcAqi = value => {
    const values = breakPoints(value);
    const diff = value - values.cLo;
    const aqi = ((values.aHi - values.aLo) / (values.cHi - values.cLo)) * diff + values.aLo;

    return aqi;
};

export default calcAqi;
