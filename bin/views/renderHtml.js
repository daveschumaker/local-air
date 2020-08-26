import SensorHistory from '../models/SensorHistory';
import config from '../../config';
const { mapUrl } = config;

const getDetails = value => {
    value = Number(value);
    let detailsObj = {};

    if (value < 50) {
        detailsObj.backgroundColor = 'rgba(104,225,67,1.0)';
        detailsObj.shortDescript = 'Good';
        detailsObj.longDescript =
            'Air quality is satisfactory, and air pollution poses little or no risk.';
    } else if (value < 100) {
        detailsObj.backgroundColor = 'rgba(255,255,85,1.0)';
        detailsObj.shortDescript = 'Moderate';
        detailsObj.longDescript =
            'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.';
    } else if (value < 150) {
        detailsObj.backgroundColor = 'rgba(239,133,51,1.0)';
        detailsObj.shortDescript = 'Unhealthy for Sensitive Groups';
        detailsObj.longDescript =
            'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
    } else if (value < 200) {
        detailsObj.backgroundColor = 'rgba(234,51,36,1.0)';
        detailsObj.shortDescript = 'Unhealthy';
        detailsObj.longDescript =
            'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.';
    } else if (value < 300) {
        detailsObj.backgroundColor = 'rgba(140,26,75,1.0)';
        detailsObj.shortDescript = 'Very Unhealthy';
        detailsObj.longDescript =
            'Health alert: The risk of health effects is increased for everyone.';
    } else {
        detailsObj.backgroundColor = 'rgba(115,20,37,1.0)';
        detailsObj.shortDescript = 'Hazardous';
        detailsObj.longDescript =
            'Health warning of emergency conditions: everyone is more likely to be affected.';
    }

    detailsObj.shortDescript = detailsObj.shortDescript.toUpperCase();

    return detailsObj;
};

const renderHtmlView = sensorData => {
    const date = new Date(sensorData.fetchTime);

    const measurementData = SensorHistory.getHistory().map((measurent = []) => {
        const dateMeasure = new Date(measurent[0]);
        return `
                <div class="recentRow">
                    <span class="recentTime">${dateMeasure.toLocaleTimeString()}:</span>
                    <span class="recentMeasurement">${measurent[1]}</span>
                </div>
            `;
    });

    return `
    <!doctype html>
    <html class="no-js" lang="">

    <head>
      <meta charset="utf-8">
      <title>Local Air Quality Monitor</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <meta property="og:title" content="">
      <meta property="og:type" content="">
      <meta property="og:url" content="">
      <meta property="og:image" content="">

      <link rel="apple-touch-icon" href="icon.png">

      <style>
        body {
            background-color: ${getDetails(sensorData.currentPM25).backgroundColor};
            font-family: Arial, Helvetica, sans-serif;
            padding: 8px;
        }

        .App {
            margin: 0 auto;
            max-width: 600px;
        }

        .TimeRow {
            font-size: small;
            padding-bottom: 4px;
            text-align: center;
            width: 100%;
        }

        .currentValue {
            text-align: center;
            vertical-align: bottom;
        }

        .healthDescrip {
            font-size: 24px;
            font-weight: bold;
            padding-top: 8px;
            text-align: center;
        }

        .pm25Value {
            font-size: 96px;
            font-weight: bold;
        }

        .longDescript {
            padding-bottom: 16px;
            text-align: center;
        }

        .title {
            font-weight: bold;
            text-align: center;
            padding-bottom: 4px;
        }

        .avgValueRow {
            border: 1px solid black;
            display: flex;
            flex-direction: row;
            line-height: 24px;
            margin-bottom: 16px;
        }

        .avgValueColumn {
            display: inline-block;
            padding: 4px;
            text-align: center;
            width: 25%;
        }

        .Row {
            padding-bottom: 8px;
            text-align: center;
            width: 100%;
        }

        a, a:visited, a:hover {
            color: black;
            font-weight: bold;
            text-decoration: underline;
        }

        .Left {
            text-align: left !important;
        }

        .recentTime {
            width: 200px;
        }

        .recentMeasurement {
            padding-left: 8px;
            width: 50px;
        }
      </style>
    </head>

    <body>
        <div class="App">
            <div class="TimeRow">Fetched at ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</div>
            <div class="healthDescrip">${getDetails(sensorData.currentPM25).shortDescript}</div>
            <div class="currentValue">
                <span class="pm25Value">${Math.floor(sensorData.currentPM25)}</span>
            </div>
            <div class="longDescript">${getDetails(sensorData.currentPM25).longDescript}</div>
            <div class="title">
                Rolling Averages
            </div>
            <div class="avgValueRow">
                <div class="avgValueColumn" style="background-color: ${
                    getDetails(sensorData.avg10Min).backgroundColor
                }">
                    10 min<br />${sensorData.avg10Min}
                </div>
                <div class="avgValueColumn" style="background-color: ${
                    getDetails(sensorData.avg30Min).backgroundColor
                }">
                    30 min<br />${sensorData.avg30Min}
                </div>
                <div class="avgValueColumn" style="background-color: ${
                    getDetails(sensorData.avg1Hr).backgroundColor
                }">
                    1 hour<br />${sensorData.avg1Hr}
                </div>
                <div class="avgValueColumn" style="background-color: ${
                    getDetails(sensorData.avg6Hr).backgroundColor
                }">
                    6 hour<br />${sensorData.avg6Hr}
                </div>
                <div class="avgValueColumn" style="background-color: ${
                    getDetails(sensorData.avg1Day).backgroundColor
                }">
                    1 day<br />${sensorData.avg1Day}
                </div>
            </div>
            <div class="Row">
                <a href="${mapUrl}">Purple Air Map</a> |
                <a href="https://www.baaqmd.gov/">BAAQMD</a>
            </div>
            <div class="Row title" style="padding-top: 8px">Recent measurements</div>
            <div class="Row Left">
                ${measurementData.join('')}
            </div>
        </div>
    </body>

    </html>
    `;
};

export { renderHtmlView };
