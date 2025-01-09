
import codes from '../helpers/statusCodes';
import Response from '../helpers/Response';
import itemRouter from './item';
import categoryRouter from './category';

/**
 * Router
 */
const route = (app) => {
  app.use('/api/v1/item', itemRouter);
  app.use('/api/v1/categories', categoryRouter);
  

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
