module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/oneDayVacay_dev'
  },
  production: {
   client: 'pg',
   connection: process.env.DATABASE_URL
 },
 test: {
   client: 'pg',
   connection:'postgres://localhost/oneDayVacay_test'
 }
};
