const parse=require("pg-connection-string").parse;
module.exports = ({ env }) => {
  if (env("NODE_ENV") === 'production'){
    const config=parse(process.env.DATABASE_URL);
    return{
      defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: config.host,
        port: config.port,
        database: config.database,
        username:config.user,
        password:config.password,
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
        },
      },
      // add this line
      options: {
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
}
}
  return ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'postgres'),
        username: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'postgres'),
      },
      options: {
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
})};
