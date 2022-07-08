const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.login = require("./login.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.salehistory = require("./salehistory.model.js")(sequelize, Sequelize);
db.salerecord = require("./salerecord.model.js")(sequelize, Sequelize);
module.exports = db;