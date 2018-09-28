var classMethods = {  };

export default  function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: { type: DataTypes.BIGINT, autoIncrement: true,  primaryKey: true }, 
        resetToken: DataTypes.STRING,
        resetExpired: DataTypes.DATE, 
        verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        phone: DataTypes.STRING, 
        email: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            notEmpty: {
              args: true,
              msg: 'Email must be filled!'
            },
          }
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              args: true,
              msg: 'Password must be filled!'
            },
            len: {
              args: [6, 255],
              msg: 'Password at least 6 characters!'
            }
          }
        },
        accountType: { type: DataTypes.STRING,
            validate: {
              notEmpty: {
                args: true,
                msg: 'Account Type must be declared!'
              },
              len: {
                args: [1, 255],
                msg: 'Account Type must be at least 1 character!'
              }
            } 
        }, 
    }, {  tableName: 'users',
        classMethods: classMethods
    });
};

