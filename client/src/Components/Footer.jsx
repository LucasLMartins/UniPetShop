import * as React from 'react';
import Box from '@mui/material/Box';
import Logo from '../Pages/imgs/logo.png'
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";

const LogoPetShop = styled(Box)({
    display: 'flex',
    height: '120px',
    color: '#f7f7f7',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '3vh',
    paddingLeft: '4vh',
    backgroundColor: '#c1aafa',
    borderRadius: '10px',

});

const Title = styled(Box)({
    color: '#f2f2f2',
    marginBottom: '3vh',
});

const Contents = styled(Box)({
    marginTop: '40px',
    marginRight: '5vh',
    width: '30vh',
    transition: '0.3s'
});


export default function FooterPetShop() {
    return(
        <Box sx={{boxShadow: 3}}>
            <Box sx={{background:'#a18fcf', zIndex: '5000', height: '50px', boxShadow: 3}}>

            </Box>
            <Box sx={{ display: 'flex', background: '#555', height: '400px', zIndex: '5000'}}>
                <Box sx={{display: 'flex',  marginLeft: 'auto', marginRight: 'auto'}}>
                    <Contents sx={{width: '55vh', marginRight: '15vh'}}>
                        <LogoPetShop>
                            <img src={Logo} height="90px" width="90px" id="logo" />
                            <Typography variant='h3' sx={{ flexGrow: 1, fontFamily: 'forte'}}>Uni Pet Shop</Typography>
                        </LogoPetShop>
                        
                        <Typography fontSize={17} color='#dedede' textAlign='justify'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor commodo gravida. Donec vel magna ipsum. Quisque condimentum,
                            donec luctus egestas elit pretium iaculis. Nullam ac rhoncus dui, nec commodo ipsum. Sed nulla augue, vehicula non dui at, dictum accumsan libero.
                            Aliquam erat volutpat. Aenean facilisis blandit mauris vel lacinia.
                        </Typography>
                    </Contents>
                    <Contents>
                        <Title>
                            <Typography variant='h4'>
                            Páginas
                            </Typography>
                        </Title>
                        
                        <Typography fontSize={17}  textAlign='justify' >
                        <Link to="/" style={{ color: '#dedede' }}>
                            Home <br/><br/>
                            </Link>
                            <Link to="/itens" style={{  color: '#dedede'  }}>
                            Itens <br/><br/>
                            </Link>
                            <Link to="/agendamento" style={{  color: '#dedede'  }}>
                            Serviços <br/><br/>
                            </Link>
                            <Link to="/sobre" style={{ color: '#dedede'  }}>
                            Sobre nós <br/><br/>
                            </Link>
                        </Typography>
                    </Contents>
                    <Contents>
                        <Title>
                            <Typography variant='h4'>
                            Contato
                            </Typography>
                        </Title>
                        
                        <Typography fontSize={17} color='#dedede' textAlign='justify' >

                        <b>Endereço:</b> R. Dante Angelote, 426 - Bairro Alto, Curitiba - PR, 82820-470 <br/><br/>
                        <b>Email:</b> unipetshop@contato.com.br <br/><br/>
                        <b>Telefone:</b> (041) 1435-0555 <br/><br/>
                        </Typography>
                    </Contents>
                </Box>
            </Box>
        </Box>
    );
}