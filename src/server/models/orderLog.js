

var classMethods = {  };

export default function(sequelize, DataTypes) {
    return sequelize.define('OrderLog', { 
        id: { type: DataTypes.BIGINT, autoIncrement: true,  primaryKey: true }, 
        orderId: {
          type: DataTypes.BIGINT, 
          references: { 
            model: 'orders',  
            key: 'id',  
          }
        }, 
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        lat: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null
        },
        lng: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null
        },
    }, {  tableName: 'orderLogs',
        classMethods: classMethods
    });
};

