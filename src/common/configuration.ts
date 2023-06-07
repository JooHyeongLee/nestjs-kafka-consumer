import 'dotenv/config';

export default () => ({
  database: {
    host: process.env.DATABASE_HOST || '',
    user: process.env.DATABASE_USER || '',
    name: process.env.DATABASE_NAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    port: process.env.DATABASE_PORT || '',
    logging: process.env.DATABASE_LOGGING || '',
    query_log: process.env.DATABASE_QUERY_LOG || ''
  },
  kafka: {
    broker1: process.env.KAFKA_BROKER1 || 'kafka_1:29092',
    broker2: process.env.KAFKA_BROKER2 || 'kafka_2:29093',
  },
});
