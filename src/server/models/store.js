var classMethods = {  };

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Store', { 
        id: { type: DataTypes.BIGINT, autoIncrement: true,  primaryKey: true },
        address: DataTypes.TEXT,
        name: DataTypes.TEXT,
        city: DataTypes.TEXT,
        state: DataTypes.TEXT,
        zipCode: DataTypes.TEXT,
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

