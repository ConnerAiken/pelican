var classMethods = {  };
  
export default  function(sequelize, DataTypes) {
    console.log(Object.keys(sequelize.models));
    return sequelize.define('UserInfo', { 
        id: { type: DataTypes.BIGINT, autoIncrement: true,  primaryKey: true }, 
        userId: {
          type: DataTypes.BIGINT, 
          references: { 
            model: sequelize.models.User,  
            key: 'id',  
          }
        },
        email: DataTypes.STRING, 
        password: DataTypes.STRING,  
        firstName: DataTypes.STRING, 
        lastName: DataTypes.STRING, 
        addressLine1: DataTypes.STRING, 
        addressLine2: DataTypes.STRING, 
        city: DataTypes.STRING, 
        state: DataTypes.STRING, 
        country: DataTypes.STRING, 
        zipCode: DataTypes.INTEGER, 
        description: DataTypes.TEXT
    }, {  tableName: 'userInfos',
        classMethods: classMethods
    });
};

