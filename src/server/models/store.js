var classMethods = {  };

export default function(sequelize, DataTypes) {
    return sequelize.define('Store', { 
        id: { type: DataTypes.BIGINT, autoIncrement: true,  primaryKey: true },
        address: DataTypes.TEXT,
        name: DataTypes.TEXT,
        city: DataTypes.TEXT,
        state: DataTypes.TEXT,
        zipCode: DataTypes.TEXT, 
        apiType: {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: "greenbits"
        },
        apiKey: {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: null
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
    }, {  tableName: 'stores',
        classMethods: classMethods
    });
};

