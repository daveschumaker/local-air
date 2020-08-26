import { getCachedData } from '../controllers/sensorDataController';
import { renderHtmlView } from '../views/renderHtml';

const viewController = async ctx => {
    try {
        const sensorData = getCachedData();
        ctx.body = renderHtmlView(sensorData);
    } catch (err) {
        ctx.body = 'Error';
        console.log(err);
    }
};

export default viewController;
