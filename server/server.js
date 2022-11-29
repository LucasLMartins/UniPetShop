const express = require('express')
const fileupload = require('express-fileupload')
const fs = require('fs')
const cors = require('cors')
const app = express()
var path = require('path')
const database = require('./models/db'); 

const port = 5000

app.use(express.json())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}))

app.use(cors())

app.get('/agendamento', (req,res) => {
    res.json([{'teste': 'parametro agendamento'}])
})

app.get('/itens', function(req,res){
    db.query(`SELECT * FROM petshop.itens`, function(erro, resultadoItens){
        if(erro){
            throw erro;
        }
        res.json([{
            itens: resultadoItens
        }])
    })
})

app.get('/item', function(req,res){
    db.query(`SELECT * FROM petshop.itens`, function(erro, resultadoItem){
        if(erro){
            throw erro;
        }
        res.json([{
            item: resultadoItem
        }])
    })
})

app.get('/admin', function(req,res){
    db.query(`SELECT * FROM petshop.itens`, function(erro, resultadoItens){
        if(erro){
            throw erro;
        }
        db.query(`SELECT p.idPedido, p.cpfCliente, i.nomeItem as 'nomeItem', p.idProduto, p.quantidadeProduto, DATE_FORMAT(p.dataPedido, '%d-%m-%Y') as 'data' FROM petshop.pedidos p INNER JOIN petshop.itens i ON p.idProduto = i.idItem`, function(erro,resultadoPedidos){
            if(erro){
                throw erro;
            }
            db.query(`SELECT idAgendamento, nomeCliente, telCliente, cpfCliente, tipoAgendamento, DATE_FORMAT(dataAgendamento, '%d-%m-%Y') as 'dataAgendamento', horaAgendamento, especieAnimal, porteAnimal FROM petshop.agendamentos`, function(erro,resultadoAgendamentos){
                if(erro){
                    throw erro;
                }
                res.json([{
                    itens: resultadoItens,
                    pedidos: resultadoPedidos,
                    agendamentos: resultadoAgendamentos
                }])
            })
        })
        
    })
})

app.post("/item/buyItem", function(req,res){
    db.query(`INSERT INTO petshop.pedidos(cpfCliente, nomeCliente, enderecoCliente, idProduto, quantidadeProduto, dataPedido) VALUES (?,?,?,?,?, CURDATE())`,
    [req.body.cpfCliente, req.body.nomeCliente, req.body.enderecoCliente, req.body.idProduto, req.body.quantidadeProduto], function(erro){
        if(erro){
            res.status(200).send('Erro: ' + erro) 
        }
    })
})

app.post("/agendamento/schedule", function(req,res){
    db.query(`INSERT INTO petshop.agendamentos(nomeCliente, telCliente, cpfCliente, tipoAgendamento, dataAgendamento, horaAgendamento, especieAnimal, porteAnimal) VALUES (?,?,?,?,?,?,?,?)`,
    [req.body.nomeCliente, req.body.telCliente, req.body.cpfCliente, req.body.tipoAgendamento, req.body.dataAgendamento, req.body.appt, req.body.especieAnimal, req.body.porteAnimal], function(erro){
        if(erro){
            res.status(200).send('Erro: ' + erro) 
        }
    })
})

app.post("/admin/insertItem", function(req,res){
    db.query(`INSERT INTO petshop.itens(nomeItem, imgUrl, precoItem, descricaoItem) VALUES (?,?,?,?)`,
    [req.body.nome, req.body.img, req.body.preco, req.body.desc], function(erro){
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
    })
})

app.post("/admin/editItem", function(req,res){
    let itemId = req.body.itemId
    let nome = req.body.nome
    let img = req.body.img
    let preco = req.body.preco
    let desc = req.body.desc
    db.query(`UPDATE petshop.itens
    SET nomeItem = "`+nome+`",
    imgUrl = "`+img+`",
    precoItem = "`+preco+`",
    descricaoItem = "`+desc+`"
    WHERE idItem = "`+itemId+`"`, function(erro){
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
    })
})

app.post("/admin/deleteItem", function(req,res){
    let itemId = req.body.itemId
    db.query(`DELETE FROM petshop.itens WHERE idItem="`+itemId+`"`)
})

// ficar abaixo de tudo
app.listen(port, () => {
    console.log('rodando na porta 5000')
})