export default () => ({
  port: process.env.APP_API_PORT
    ? parseInt(process.env.APP_API_PORT, 10)
    : 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'pass',
    database: process.env.DB_NAME || 'db',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1h',
  },
});
