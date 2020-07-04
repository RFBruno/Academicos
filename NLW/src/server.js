const express = require('express');
const server = express();

//pegar o BD
const db = require('./database/db');

//configurar pasta publica
server.use(express.static('public'));

//habilitando o uso do req.body
server.use(express.urlencoded({ extended: true}));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views" , {
    express: server,
    noCache: true
});


//configurar caminhos da minha aplicacao
//pagina inicial
//req: pedido de dados
//res: dados respondido pelo servidor
server.get('/', (req, res)=>{
    return res.render("index.html");
});

server.get('/create-point', (req, res)=>{
    
    
    //req.query: query strings da nossa url
    console.log(req.query);
    
    
    return res.render("create-point.html");
});

server.post('/savepoint', (req, res) =>{
    //req.body: corpo do formulario
    console.log(req.body);

    //inserir dados na BD
    const queryInsert = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);`;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ];

        db.run(queryInsert, values, function(err){
            if(err){
                return res.render('create-point.html', { erro:true });
            }

            console.log('Cadastrado com sucesso!');           
            return res.render('create-point.html', { saved:true });
        });
});

server.get('/search', (req, res)=>{

    const search = req.query.search;

    if(search == ''){
        //pesquisa vazia       
            return res.render("search-results.html", { places:0 });       
    }
    
    //consultar dados da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }
        console.log(rows);
        
        return res.render("search-results.html", { places : rows });
    });
    
});

//ligar o servidor
server.listen(9000);
