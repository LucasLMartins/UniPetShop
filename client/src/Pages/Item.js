import { useState, useEffect } from "react";
import api from '../api.js'
import Header from "../Components/Header.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import FooterPetShop from "../Components/Footer.jsx";

function Item() {

    const [item, setItem] = useState([])
    const [buyItemState, setBuyItemState] = useState({ cpfCliente: '', nomeCliente: '', enderecoCliente: '', idProduto: '', quantidadeProduto: '1' })

    const navigate = useNavigate();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const id = query.get('id');

    useEffect(() => {
        api.get('/item').then(res => {
            let parametros = (res.data[0].item)

            let filter = parametros.filter(i => i.idItem == id)
            setItem(filter[0])
        })

    }, [id])

    function OpenBuyModal() {
        document.getElementById('buy-modal').style.display = 'flex'
        setBuyItemState({
            cpfCliente: '',
            nomeCliente: '',
            enderecoCliente: '',
            idProduto: item.idItem,
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
            <div className="full-content">
                <div className="item-main-div">
                    <div className="item-div-left">
                        <div className="item-page-img-container">
                            <img className="item-page-img" src={item.imgUrl} ></img>
                        </div>
                    </div>

                    <div className="item-div-right">
                        <div className="item-div-name">
                            <p className="">{item.nomeItem}</p>
                        </div>
                        <div className="item-div-desc">
                            <p className="">{item.descricaoItem}</p>
                        </div>
                        <div className="item-div-price">
                            <p className="">R${item.precoItem}</p>
                        </div>
                        <div className="item-div-buy">
                            <div className="item-div-buy-left">
                                <div className="item-div-buy-left-top">
                                    <p>Quantidade:</p>
                                </div>
                                <div className="item-div-buy-left-bottom">
                                    <input id="quantidade-produto-input" onChange={e => setBuyItemState({ ...buyItemState, quantidadeProduto: e.target.value })} className="input-item-buy" type='number' defaultValue='1'></input>
                                </div>
                            </div>
                            <div className="item-div-buy-right">
                                <div onClick={() => OpenBuyModal()} className="item-buy-button">
                                    Comprar
                                </div>
                            </div>
                        </div>
                    </div>

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
                </div>
            </div>
            <FooterPetShop />
        </div>
    )

}

export default Item;