
import codes from '../helpers/statusCodes';
import Response from '../helpers/Response';
import itemRouter from './item';
import categoryRouter from './category';
import usersRouter from './user';
import { authenticated } from '../middlewares/authentication';
import authRouter from './auth';
import logRouter from './logs';

/**
 * Router
 */
const route = (app) => {
  app.use('/api/v1/item', authenticated, itemRouter);
  app.use('/api/v1/categories', categoryRouter);
  app.use('/api/v1/user', authenticated, usersRouter);
  app.use('/api/v1/logs', authenticated, logRouter);
  app.use('/api/v1/auth', authRouter);

  app.get('/', (req, res) => Response.send(res, codes.success, {
    message: 'This app is running!!!',
  }));
  app.get('/api', (req, res) => Response.send(res, codes.success, {
    message: 'This app is running!!!',
  }));
  app.get('/api/v1', (req, res) => Response.send(res, codes.success, {
    message: 'This is version 1.0.1!',
  }));


  app.get('*', (req, res) => Response.send(res, codes.notFound, {
    error: 'Endpoint not found.',
  }));
};

export default route;
