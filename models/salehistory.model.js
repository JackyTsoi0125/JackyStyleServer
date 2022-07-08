module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define("salehistory", {     
      SaleID: {
        type: Sequelize.INTEGER,  
        primaryKey: true     
      },
      UserID: {
        type: Sequelize.INTEGER       
      },
      Price: {
        type: Sequelize.INTEGER       
      },
      status: {
        type: Sequelize.STRING
      }
    }, {

      tableName : 'salehistory',
      timestamps:false
    }    
    );
    return History;
  };