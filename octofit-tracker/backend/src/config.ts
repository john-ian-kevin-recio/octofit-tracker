import { mongoUri } from './config/database';

const port = Number(process.env.PORT) || 8000;

export { mongoUri, port };
