const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('./sequelize'); // Ensure this is your Sequelize instance

const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js', // Ensure this path is correct
    resolve: ({ name, path, context }) => {
      const migration = require(path);
      return {
        name,
        up: async () => migration.up(context, sequelize.constructor),
        down: async () => migration.down(context, sequelize.constructor),
      };
    },
  },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

module.exports = umzug;
