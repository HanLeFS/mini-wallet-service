import config from 'config';
import { dbConfig } from '@interfaces/db.interface';

const { host, port, database, type, uri}: dbConfig = config.get('dbConfig');

export const dbConnection = {
  connectionType: type,
  uri: process.env.DB_URI || uri,
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
