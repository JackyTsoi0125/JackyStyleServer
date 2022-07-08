module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      ProductID: {
        type: Sequelize.INTEGER,
        primaryKey: true   
      },
      Name: {
        type: Sequelize.STRING
      },
      Type: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      ProductionPlace: {
        type: Sequelize.STRING
      }
      ,
      Brand: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.INTEGER       
      },
      XS: {
        type: Sequelize.INTEGER       
      },
      S: {
        type: Sequelize.INTEGER       
      },
      M: {
        type: Sequelize.INTEGER       
      },
      L: {
        type: Sequelize.INTEGER       
      },
      XL: {
        type: Sequelize.INTEGER       
      },
      XXL: {
        type: Sequelize.INTEGER       
      }
    }, {

      tableName : 'Product',
      timestamps:false
    }    
    );
    return Product;
  };