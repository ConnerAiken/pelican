var classMethods = {  };
  
export default  function(sequelize, DataTypes) {
    console.log(Object.keys(sequelize.models));
    return sequelize.define('AuthLog', { 
        id: { type: DataTypes.BIGINT, autoIncrement: true,  primaryKey: true }, 
        ip: DataTypes.STRING,
        type: DataTypes.STRING,
        userId: {
          type: DataTypes.BIGINT,  
          references: { 
            model: 'users',  
            key: 'id',  
          }
        }, 
    }, {  tableName: 'authLogs',
        classMethods: classMethods
    });
};

