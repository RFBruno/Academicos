// importando a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose();

//criar objeto que vai fazer operacoes no BD
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;


//utilizar o objeto de BD para nossas operacoes
// db.serialize(() =>{
//     //Fazendo o CRUD com comandos SQL Lite 3
//     //criar uma tabela
//         db.run(`
//            CREATE TABLE IF NOT EXISTS places (
//                 id INTEGER  PRIMARY KEY AUTOINCREMENT,
//                 image TEXT,
//                 name TEXT,
//                 address TEXT,
//                 address2 TEXT,
//                 state TEXT,
//                 city TEXT,
//                 items TEXT
//            );         
//         `);

//     //inserir dados na tabela
//     const queryInsert = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?, ?, ?, ?, ?, ?, ?);`;

//     const values = [
//         'https://sitesustentavel.com.br/wp-content/uploads/2019/05/sh_reciclagem_1326222176.jpg',
//         'Papersider',
//         'Guilherme Gemballa, Jardim América',
//         'Nº 260',
//         'Rio do Sul',
//         'Santa Catarina',
//         'Papéis e Papelão'
//     ];

//         db.run(queryInsert, values, function(err){
//             if(err){
//                 return console.log(err);
//             }

//             console.log('Cadastrado com sucesso!');           
//         });


//     //consultar dados da tabela
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err){
//             return console.log(err);
//         }
    
//         console.log('Aqui estao seus registros');
//         console.log(rows);

//     });

    
//     //deletar dados na tabela
//     db.run(`DELETE FROM places WHERE id = ?`,[4], function(err){
//         if(err){
//             return console.log(err);
//         }
        
//         console.log('Registros deletado com sucesso');            
//     });

// });