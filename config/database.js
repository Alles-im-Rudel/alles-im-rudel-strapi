module.exports = ({ env }) => ({
  connection: {
    client: env('DB_CONNECTION'),
    connection: {
      host: env('DB_HOST'),
      port: env('DB_PORT'),
      database: env('DB_DATABASE'),
      user: env('DB_USERNAME'),
      password: env('DB_PASSWORD'),
    },
    useNullAsDefault: true,
  },
});
