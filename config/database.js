module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DB_CONNECTION'),
      port: env('DB_PORT'),
      database: env('DB_DATABASE'),
      user: env('DB_USERNAME'),
      password: env('DB_PASSWORD'),
    },
    useNullAsDefault: true,
  },
});
