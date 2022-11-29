import * as React from 'react';
import { useState, useEffect } from "react";
import api from '../api.js'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from '../Components/Header';
import Box from '@mui/material/Box';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useNavigate, useLocation } from "react-router-dom";
import { Divider } from '@mui/material';
import FooterPetShop from '../Components/Footer.jsx';


function Carrinho() {
    const [buyItemState, setBuyItemState] = useState({ cpfCliente: '', nomeCliente: '', enderecoCliente: '', idProduto: '', quantidadeProduto: '1' })
    const [parametros, setParametros] = useState([])
    const navigate = useNavigate();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const search = query.get('search');

    useEffect(() => {
        api.get('/itens').then(res => {
            let parametros = (res.data[0].itens)
            console.log(parametros)

            if (search == null || search == ""){
                setParametros(parametros)
            }
            else {
                let filter = parametros.filter(
                    i => i.nomeItem.toLowerCase().includes(search.toLowerCase())
                )
                setParametros(filter)
            }
            
        })
    }, [search])

    function OpenBuyModal() {
        document.getElementById('buy-modal').style.display = 'flex'
        setBuyItemState({
            cpfCliente: '',
            nomeCliente: '',
            enderecoCliente: '',
            idProduto: '1',
            quantidadeProduto: buyItemState.quantidadeProduto
        })
    
        console.log(buyItemState)
    }

    function closeBuyModal() {
        document.getElementById('buy-modal').style.display = 'none'
    }

    function buyItem() {
        let nomeCliente = document.getElementById('nomeCliente').value
        let cpfCliente = document.getElementById('cpfCliente').value
        let enderecoCliente = document.getElementById('enderecoCliente').value

        if (nomeCliente !== '' && cpfCliente !== "" && enderecoCliente !== "") {
            fetch('http://localhost:5000/item/buyItem', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(buyItemState)
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                })
            navigate(0)
        }
        else {
            window.alert('Preencha todos os campos!')
        }
    }
    
return (
    <div classname="base-projeto">
        <Header />
        <br/><br/>
        <Box sx={{width: '60%', padding: '2vh', margin: 'auto', marginBottom: '20vh', backgroundColor: '#f2f2f2', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
            {
                parametros.map((item, i) => (
                    <div key={i}>
                        <Card sx={{ flexGrow: 1, display:'flex', width: '100%', marginBottom: '2vh' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.imgUrl}
                                sx={{maxWidth: 200}}
                            />
                            <CardContent sx={{width: '100%', display: 'flex', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto'}}>
                                <Typography variant='h5' sx={{width: '100%'}}>
                                {item.nomeItem}
                                </Typography>
                                <Typography variant="h5" color="#a18fcf">
                                R${item.precoItem}
                                </Typography>
                                    <input  className="input-item-buy-cart" type='number' defaultValue='1'></input>
                                <Button size="medium" sx={{marginLeft: '2vh', backgroundColor: '#d65656', borderRadius: '10px', color: '#f2f2f2'}}>
                                    <RemoveCircleIcon />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }

            <Button onClick={() => OpenBuyModal()} sx={{marginLeft: '85%', padding: '15px', fontSize: 20, backgroundColor: '#a18fcf', color: '#f2f2f2'}}>
                Comprar
            </Button>    
        </Box>
        <div id="buy-modal" className="buy-new-modal">
            <div className="buy-modal-container">
                <div className="insert-new-modal-top">
                    <p className="create-new-product">Preencha suas informações</p>
                    <span className="close-buy-new-modal" onClick={() => closeBuyModal()}>X</span>
                </div>

                <div>

                    <label>Nome</label>
                    <br></br>
                    <input type='text' onChange={e => setBuyItemState({ ...buyItemState, nomeCliente: e.target.value })} required name="nomeProd" id="nomeCliente" className="input-buy-modal"></input>
                    <br></br>
                    <label>CPF</label>
                    <br></br>
                    <input type='text' onChange={e => setBuyItemState({ ...buyItemState, cpfCliente: e.target.value })} required name="imgProd" id="cpfCliente" className="input-buy-modal"></input>
                    <br></br>
                    <label>Endereço</label>
                    <br></br>
                    <input type='text' onChange={e => setBuyItemState({ ...buyItemState, enderecoCliente: e.target.value })} required name="descProd" id="enderecoCliente" className="input-buy-modal"></input>
                    <br></br>
                    <button onClick={() => buyItem()} className="buy-product-create-button">Comprar</button>

                </div>
            </div>
        </div>
        <FooterPetShop />
    </div>
    
  );
}
export default Carrinho;