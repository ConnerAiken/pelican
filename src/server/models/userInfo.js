var classMethods = {  };
  
export default  function(sequelize, DataTypes) { 
    return sequelize.define('UserInfo', { 
        id: { type: DataTypes.BIGINT, autoIncrement: true,  primaryKey: true }, 
        userId: {
          type: DataTypes.BIGINT, 
          references: { 
            model: 'users',  
            key: 'id',  
          }
        },
        isAcceptingOrders: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: 0
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: 0
        }, 
        firstName: DataTypes.STRING, 
        lastName: DataTypes.STRING, 
        addressLine1: DataTypes.STRING, 
        addressLine2: DataTypes.STRING, 
        city: DataTypes.STRING, 
        state: DataTypes.STRING, 
        country: DataTypes.STRING, 
        zipCode: DataTypes.INTEGER, 
        description: DataTypes.TEXT, 
        profileImageBase64: {
            type: DataTypes.TEXT('long'),
        },
        licenseImageBase64: {
            type: DataTypes.TEXT('long'),
        },
        vehicleImageBase64: {
            type: DataTypes.TEXT('long'),
        },
    }, {  tableName: 'userInfos',
        classMethods: classMethods
    });
};

