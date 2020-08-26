// core-js and regenerator-runtime should be the first line in
// entry point of app, so that async generators are useable
// when babel compiles and builds the app.
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Koa from 'koa';
import config from '../config';
import cronJobs from './tasks/cronJobs';
import onBoot from './tasks/onBoot';
import viewController from './controllers/viewController';

console.log('--== Local Air Quality Monitor Online ==--');

const app = new Koa();
const port = process.env.PORT || config.PORT || 3000;

onBoot.run();
cronJobs.run();

/**
 * Display a very basic webpage with
 * the most recently fetched sensor data
 */
app.use(viewController);
app.listen(port);
