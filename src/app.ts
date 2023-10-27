import { Server } from 'http';

import express, { Request, Response, NextFunction } from 'express';
import countryRoutes from './routes/countries';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import cors from 'cors';

const app = express();
let server: Server;
const swaggerDocument = YAML.load('./doc/api.yaml');

// middlwares
app.use(express.json());
app.use(cors());

// routes
app.use('/countries', countryRoutes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

export default {
  async start(): Promise<Server> {
    const port = process.env.PORT || 8888;
    server = app.listen(port, () => {
      console.log(`Server is listening on ${port} port`);
    });
    return server;
  },

  async stop(cb?: (err?: Error) => void): Promise<Server> {
    console.log(`\nTrying to close the server..\n`);
    return server.close(cb);
  },
};
