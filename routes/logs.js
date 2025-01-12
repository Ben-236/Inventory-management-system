/* eslint-disable */
import express from 'express';
import LogController from '../controllers/LogController';


/**
 * Routes of '/category'
 */
const logRouter = express.Router();

logRouter.route('/').get( LogController.allLogs);

export default logRouter;
