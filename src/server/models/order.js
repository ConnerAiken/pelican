var classMethods = {  };

export default function(sequelize, DataTypes) {
    return sequelize.define('Order', { 
        id: { type: DataTypes.BIGINT, autoIncrement: true,  primaryKey: true }, 
        requestorId: {
          type: DataTypes.BIGINT, 
          references: { 
            model: 'users',  
            key: 'id',  
          }
        },
        driverId: {
          type: DataTypes.BIGINT, 
          allowNull: true,
          references: { 
            model: 'users',  
            key: 'id',  
          }
        },
        storeId: {
          type: DataTypes.BIGINT, 
          allowNull: true,
          references: { 
            model: 'stores',  
            key: 'id',  
          }
        },  
        items: {
          type: DataTypes.JSON 
        },  
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {  tableName: 'orders',
        classMethods: classMethods
    });
}; 