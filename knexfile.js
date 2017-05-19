module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/PackaVacay_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/PackaVacay_test',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
