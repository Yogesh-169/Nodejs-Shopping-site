// const mysql=require('mysql2');
// const db=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'admin',
//     database:'ecommerce'
// });

// module.exports=db.promise();


const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'ecommerce',
    'root',
    'admin',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize; 