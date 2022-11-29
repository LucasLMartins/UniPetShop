import { useState, useEffect } from "react";
import api from '../api.js'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import HomeIcon from '@mui/icons-material/Home';

function Admin() {

    const [login, setLogin] = useState(localStorage.getItem('login'))
    const [parametros, setParametros] = useState([])
    const [parametrosPedidos, setParametrosPedidos] = useState([])
    const [parametrosAgendamentos, setParametrosAgendamentos] = useState([])
    const [itemInsertState, setItemInsertState] = useState({ nome: '', img: '', desc: '', preco: '' })
    const [itemEditState, setItemEditState] = useState({ itemId: '', nome: '', img: '', desc: '', preco: '' })
    const [itemDeleteState, setItemDeleteState] = useState({ itemId: '' })

    const navigate = useNavigate();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const page = query.get('page');

    useEffect(() => {
        api.get('/admin').then(res => {
            let parametros = (res.data[0].itens)
            setParametros(parametros)
            let parametrosPedidos = (res.data[0].pedidos)
            setParametrosPedidos(parametrosPedidos)
            let parametrosAgendamentos = (res.data[0].agendamentos)
            setParametrosAgendamentos(parametrosAgendamentos)
        })
    }, [])

    function loginForm() {
        let adminUser = document.getElementById('adminUser').value
        let adminPassword = document.getElementById('adminPass').value
        if (adminUser == "admin" && adminPassword == "12345") {
            localStorage.setItem('login', 'true')
            navigate(0)
        }
        else {
            window.alert('Login ou senha errados, tente novamente.')
        }
    }

    function deslogar() {
        localStorage.setItem('login', 'false')
        navigate(0)
    }

    function OpenCreateModal() {
        document.getElementById('new-modal').style.display = 'flex'
    }

    function closeCreateModal() {
        document.getElementById('new-modal').style.display = 'none'
    }

    function openEditModal(item) {
        document.getElementById('edit-modal').style.display = 'flex'
        document.getElementById('nomeProdEdit').value = item.nomeItem
        document.getElementById('imgProdEdit').value = item.imgUrl
        document.getElementById('descProdEdit').value = item.descricaoItem
        document.getElementById('precoProdEdit').value = item.precoItem

        setItemEditState({
            itemId: item.idItem,
            nome: item.nomeItem,
            img: item.imgUrl,
            desc: item.descricaoItem,
            preco: item.precoItem
        })
    }

    function closeEditModal() {
        document.getElementById('edit-modal').style.display = 'none'
    }

    function openDeleteModal(item) {
        document.getElementById('delete-modal').style.display = 'flex'
        document.getElementById('product-delete-name').innerHTML = item.nomeItem

        setItemDeleteState({
            itemId: item.idItem
        })
    }

    function closeDeleteModal() {
        document.getElementById('delete-modal').style.display = 'none'
    }

    function insertItem() {
        let nomeProd = document.getElementById('nomeProd').value
        let imgProd = document.getElementById('imgProd').value
        let descProd = document.getElementById('descProd').value
        let precoProd = document.getElementById('precoProd').value

        if (nomeProd !== '' && imgProd !== "" && descProd !== "" && precoProd !== "") {
            fetch('http://localhost:5000/admin/insertItem', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(itemInsertState)
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

    function editItem() {
        let nomeProd = document.getElementById('nomeProdEdit').value
        let imgProd = document.getElementById('imgProdEdit').value
        let descProd = document.getElementById('descProdEdit').value
        let precoProd = document.getElementById('precoProdEdit').value

        if (nomeProd !== '' && imgProd !== "" && descProd !== "" && precoProd !== "") {
            fetch('http://localhost:5000/admin/editItem', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(itemEditState)
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

    function deleteItem() {
        fetch('http://localhost:5000/admin/deleteItem', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(itemDeleteState)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
            })
        navigate(0)
    }

    function changeProducts() {
        navigate("/admin")
    }

    function changeOrders() {
        navigate("/admin?page=orders")
    }

    function changeSchedules() {
        navigate("/admin?page=schedules")
    }


    if (login === 'true' && page == null) return (
        <div className="admin-main-div">
            <div className="admin-login-header">
                <div  className="admin-return-home">
                    <div onClick={() => navigate('/')} className="home-icon-div">
                        <HomeIcon sx={{ fontSize: 40, color: 'white' }} />
                    </div>
                </div>
                <div className="">
                    <div onClick={() => changeProducts()} className="admin-select-products admin-select">
                        <p>Produtos</p>
                    </div>
                    <div onClick={() => changeOrders()} className="admin-select-orders admin-select">
                        <p>Pedidos</p>
                    </div>
                    <div onClick={() => changeSchedules()} className="admin-select-schedules admin-select">
                        <p>Agendamentos</p>
                    </div>
                </div>

                <div className="admin-logout">
                    <button className="admin-logout-button" onClick={() => deslogar()}>Deslogar</button>
                </div>
            </div>


            <div className="admin-paper">
                <div className="admin-header">
                    <span className="admin-product-title">Produtos</span>
                    <button className="admin-product-create-button" onClick={() => OpenCreateModal()}>Criar</button>
                </div>
                <div className="admin-crud-container">
                    <div className="admin-table">
                        <div className="header-crud">
                            <div className="crud-id crud-line">id</div>
                            <div className="crud-img crud-line">Imagem</div>
                            <div className="crud-name crud-line">Nome</div>
                            <div className="crud-desc crud-line">Descrição</div>
                            <div className="crud-price crud-line">Preço</div>
                            <div className="crud-act crud-line">Ações</div>
                        </div>
                        {
                            parametros.map((item, i) => (
                                <div key={i} className='item-crud'>
                                    <div className="crud-id crud-line">{item.idItem}</div>
                                    <div className="crud-img crud-line"><img src={item.imgUrl} width='60px'></img></div>
                                    <div className="crud-name crud-line">{item.nomeItem}</div>
                                    <div className="crud-desc crud-line">{item.descricaoItem}</div>
                                    <div className="crud-price crud-line">R${item.precoItem}</div>
                                    <div className="crud-act crud-line">
                                        <div className="edit-item" onClick={() => openEditModal(item)}><p className="edit-item-p">Edit</p></div>
                                        <div className="delete-item" onClick={() => openDeleteModal(item)}><p className="edit-item-p">Del</p></div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>

                    <div id="new-modal" className="insert-new-modal">
                        <div className="new-modal-container">
                            <div className="insert-new-modal-top">
                                <p className="create-new-product">Criar novo produto</p>
                                <span className="close-insert-new-modal" onClick={() => closeCreateModal()}>X</span>
                            </div>

                            <div>

                                <label>Nome do produto</label>
                                <br></br>
                                <input onChange={e => setItemInsertState({ ...itemInsertState, nome: e.target.value })} type='text' required name="nomeProd" id="nomeProd" className="input-new-modal"></input>
                                <br></br>
                                <label>URL da imagem</label>
                                <br></br>
                                <input onChange={e => setItemInsertState({ ...itemInsertState, img: e.target.value })} type='text' required name="imgProd" id="imgProd" className="input-new-modal"></input>
                                <br></br>
                                <label>Descrição</label>
                                <br></br>
                                <input onChange={e => setItemInsertState({ ...itemInsertState, desc: e.target.value })} type='text' required name="descProd" id="descProd" className="input-new-modal"></input>
                                <br></br>
                                <label>Preço</label>
                                <br></br>
                                <input onChange={e => setItemInsertState({ ...itemInsertState, preco: e.target.value })} type='text' required name="precoProd" id="precoProd" className="input-new-modal"></input>
                                <br></br>
                                <button onClick={() => insertItem()} className="admin-product-create-button">Criar</button>

                            </div>
                        </div>
                    </div>

                    <div id="edit-modal" className="edit-modal">
                        <div className="new-modal-container">
                            <div className="insert-new-modal-top">
                                <p className="create-new-product">Editar produto</p>
                                <span className="close-insert-new-modal" onClick={() => closeEditModal()}>X</span>
                            </div>

                            <div>

                                <label>Nome do produto</label>
                                <br></br>
                                <input onChange={e => setItemEditState({ ...itemEditState, nome: e.target.value })} type='text' required name="nomeProd" id="nomeProdEdit" className="input-new-modal"></input>
                                <br></br>
                                <label>URL da imagem</label>
                                <br></br>
                                <input onChange={e => setItemEditState({ ...itemEditState, img: e.target.value })} type='text' required name="imgProd" id="imgProdEdit" className="input-new-modal"></input>
                                <br></br>
                                <label>Descrição</label>
                                <br></br>
                                <input onChange={e => setItemEditState({ ...itemEditState, desc: e.target.value })} type='text' required name="descProd" id="descProdEdit" className="input-new-modal"></input>
                                <br></br>
                                <label>Preço</label>
                                <br></br>
                                <input onChange={e => setItemEditState({ ...itemEditState, preco: e.target.value })} type='text' required name="precoProd" id="precoProdEdit" className="input-new-modal"></input>
                                <br></br>
                                <button onClick={() => editItem()} className="admin-product-create-button">Editar</button>

                            </div>
                        </div>
                    </div>

                    <div id="delete-modal" className="edit-modal">
                        <div className="new-modal-container">
                            <div className="insert-new-modal-top">
                                <p className="delete-product">Deseja mesmo excluir este produto?</p>
                                <p id="product-delete-name" className="delete-product-name"></p>
                            </div>

                            <div>
                                <button onClick={() => deleteItem()} className="admin-product-create-button mr-20">Sim</button>
                                <button onClick={() => closeDeleteModal()} className="admin-product-create-button">Não</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>



            <div>

            </div>
        </div>

    )

    if (login === 'true' && page == 'orders') return (
        <div className="admin-main-div">
            <div className="admin-login-header">
                <div className="admin-return-home">
                    <div onClick={() => navigate('/')} className="home-icon-div">
                        <HomeIcon sx={{ fontSize: 40, color: 'white' }} />
                    </div>
                </div>
                <div className="">
                    <div onClick={() => changeProducts()} className="admin-select-products admin-select">
                        <p>Produtos</p>
                    </div>
                    <div onClick={() => changeOrders()} className="admin-select-orders admin-select">
                        <p>Pedidos</p>
                    </div>
                    <div onClick={() => changeSchedules()} className="admin-select-schedules admin-select">
                        <p>Agendamentos</p>
                    </div>
                </div>

                <div className="admin-logout">
                    <button className="admin-logout-button" onClick={() => deslogar()}>Deslogar</button>
                </div>
            </div>

            <div className="admin-paper">
                <div className="admin-header">
                    <span className="admin-product-title">Pedidos</span>
                </div>

                <div className="admin-orders-container">
                    <div className="admin-table">
                        <div className="header-crud">
                            <div className="crud-id-orders crud-line">id</div>
                            <div className="crud-cpf-orders crud-line">cpfCliente</div>
                            <div className="crud-nameProduct-orders crud-line">nomeProduto</div>
                            <div className="crud-product-orders crud-line">idProduto</div>
                            <div className="crud-qnt-orders crud-line">Quantidade</div>
                            <div className="crud-date-orders crud-line">Data</div>
                        </div>

                        {
                            parametrosPedidos.map((item, i) => (
                                <div key={i} className='item-crud'>
                                    <div className="crud-id-orders crud-line">{item.idPedido}</div>
                                    <div className="crud-cpf-orders crud-line">{item.cpfCliente}</div>
                                    <div className="crud-nameProduct-orders crud-line">{item.nomeItem}</div>
                                    <div className="crud-product-orders crud-line">{item.idProduto}</div>
                                    <div className="crud-qnt-orders crud-line">{item.quantidadeProduto}</div>
                                    <div className="crud-date-orders crud-line">{item.data}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )

    if (login === 'true' && page == 'schedules') return (
        <div className="admin-main-div">
            <div className="admin-login-header">
                <div className="admin-return-home">
                    <div onClick={() => navigate('/')} className="home-icon-div">
                        <HomeIcon sx={{ fontSize: 40, color: 'white' }} />
                    </div>
                </div>
                <div className="">
                    <div onClick={() => changeProducts()} className="admin-select-products admin-select">
                        <p>Produtos</p>
                    </div>
                    <div onClick={() => changeOrders()} className="admin-select-orders admin-select">
                        <p>Pedidos</p>
                    </div>
                    <div onClick={() => changeSchedules()} className="admin-select-schedules admin-select">
                        <p>Agendamentos</p>
                    </div>
                </div>

                <div className="admin-logout">
                    <button className="admin-logout-button" onClick={() => deslogar()}>Deslogar</button>
                </div>
            </div>


            <div className="admin-paper">
                <div className="admin-header">
                    <span className="admin-product-title">Agendamentos</span>
                </div>

                <div className="admin-schedules-container">

                    <div className="admin-table">
                        <div className="header-crud">
                            <div className="crud-nome-schedules crud-line">nomeCliente</div>
                            <div className="crud-fone-schedules crud-line">foneCliente</div>
                            <div className="crud-cpf-schedules crud-line">cpfCliente</div>
                            <div className="crud-tipo-schedules crud-line">tipo</div>
                            <div className="crud-data-schedules crud-line">Data</div>
                            <div className="crud-hour-schedules crud-line">Hora</div>
                            <div className="crud-specie-schedules crud-line">Espécie</div>
                            <div className="crud-animal-schedules crud-line">PorteAnimal</div>
                        </div>

                        {
                            parametrosAgendamentos.map((item, i) => (
                                <div key={i} className='item-crud'>
                                    <div className="crud-nome-schedules crud-line">{item.nomeCliente}</div>
                                    <div className="crud-fone-schedules crud-line">{item.telCliente}</div>
                                    <div className="crud-cpf-schedules crud-line">{item.cpfCliente}</div>
                                    <div className="crud-tipo-schedules crud-line">{item.tipoAgendamento}</div>
                                    <div className="crud-data-schedules crud-line">{item.dataAgendamento}</div>
                                    <div className="crud-hour-schedules crud-line">{item.horaAgendamento}</div>
                                    <div className="crud-specie-schedules crud-line">{item.especieAnimal}</div>
                                    <div className="crud-animal-schedules crud-line">{item.porteAnimal}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>


        </div>
    )

    return (
        <div className="admin-main-div">

            <h1 className="mt-20">Login Admin</h1>
            <div className="admin-form" method='get'>
                <input type="text" id="adminUser" placeholder="Usuário" className="admin-user-input" required name="user"></input>
                <br></br>
                <input type="password" id="adminPass" placeholder="Senha" className="admin-password-input" required name="password"></input>
                <br></br>

                <div className="divAdminButtons">
                    <button id="adminButton" className="adminButton" onClick={() => loginForm()}>Entrar</button>
                    <button className="adminButton" onClick={() => navigate('/')}>Sair</button>
                </div>
                
            </div>

        </div>
    )


}

export default Admin;