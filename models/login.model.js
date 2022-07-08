module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
     
      UserName: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Role: {
        type: Sequelize.STRING
      }
      
    }, {
        tableName : 'Login',
        timestamps:false
    });
    return Login;
  };