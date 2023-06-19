const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../configs/dbConnection').sequelize;


class Dogs extends Model { }

Dogs.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tail_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'dogs',
    timestamps: false, // adds createdAt and updatedAt columns to the table // We need to pass the connection instance
    modelName: 'Dogs', // We need to choose the model name
    underscored: true
});


module.exports = Dogs;