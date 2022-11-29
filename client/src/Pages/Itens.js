import { useState, useEffect } from "react";
import api from '../api.js'
import { useLocation } from "react-router-dom";
import Header from "../Components/Header.jsx";
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FooterPetShop from "../Components/Footer.jsx";

const cart = [];
function AddToCart(item){
    cart.push(item.idItem)
    console.log(cart)
    window.localStorage.setItem('lista_de_items', cart)
}

function Itens() {

    const [parametros, setParametros] = useState([])

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const search = query.get('search');

    useEffect(() => {
        api.get('/itens').then(res => {
            let parametros = (res.data[0].itens)

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

    return (
        <div classname="base-projeto">
            <Header />
            <div class="full-content">
            <div className="items-main-div">
                <div className="items-title">
                    <h1>Itens à venda</h1>
                </div>

                <hr/>
                                        
                <div className="items-grid-container">
                    <div className="items-grid">
                        {
                            parametros.map((item, i) => (
                                <div key={i} className="items-item-container">
                                    <Link to={"/item?id=" + item.idItem} style={{ textDecoration: 'none' }}>
                                        <div className="item-img-container">
                                            <div className="item-img-container-inner">
                                                <img className="item-img" src={item.imgUrl}></img>
                                            </div>
                                        </div>

                                        <div className="item-info-container">
                                            <div className="item-name-container">
                                                <p className="item-name" >{item.nomeItem}</p>
                                            </div>

                                            <div className="item-price-container">
                                                <p className="item-price">R${item.precoItem}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }

                    </div>


                </div>
                </div>
            </div>
            <FooterPetShop />
        </div>

    );


}

export default Itens;