module.exports = (sequelize, Sequelize) => {
    const Record = sequelize.define("salerecord", {     
      ID: {
        type: Sequelize.INTEGER,  
        primaryKey: true     
      },
      SaleID: {
        type: Sequelize.INTEGER       
      },
      UserID: {
        type: Sequelize.INTEGER       
      },
      ProductID: {
        type: Sequelize.INTEGER       
      },
      SIZE: {
        type: Sequelize.STRING
      },
      Quantity: {
        type: Sequelize.INTEGER       
      }
    }, {

      tableName : 'salerecord',
      timestamps:false
    }    
    );
    return Record;
  };