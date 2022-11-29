import * as React from 'react';
import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../Pages/imgs/logo.png'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from '@mui/material/styles';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import api from '../api.js'
import { useNavigate, useLocation, Link } from "react-router-dom";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    transition: '0.3s',
    borderRadius: '10px',
    backgroundColor: alpha('#f7f7f7', 0.15),
    '&:hover': {
        backgroundColor: alpha('#f7f7f7', 0.25),
    },
    marginLeft: 40,
    marginRight: 30,
    width: '100%',
}));

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '90ch',
    },
}));

const SearchIconStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    color: '#f7f7f7',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ButtonStyled = styled(Button)({
    fontSize: 18,
    borderRadius: '0px',
    padding: '15px 97px 15px 97px',
    height: '100%',
    color: '#f7f7f7',
    '&:hover': {
        color: '#f7f7f7',
        backgroundColor: '#c1aafa',
    }
});

export default function Header() {
    const navigate = useNavigate();
    const [formInput, updateFormInput] = useState({search: '' })


    const SearchItem = (e) => {
        e.preventDefault()
        navigate('/itens?search=' + formInput.search)
    }

    return (
        <Box sx={{ flexGrow: 1, top: 0, position: 'sticky', zIndex: 5000 }}>
            <AppBar sx={{ backgroundColor: '#AA96DA', top: 0, position: 'sticky' }}>
                <Toolbar sx={{ marginLeft: '20%', marginRight: '20%' }}>
                    <img src={Logo} height="120px" width="120px" id="logo" />
                
                    <Search>
                        <SearchIconStyled>
                            <SearchIcon />
                        </SearchIconStyled>
                        <form onSubmit={SearchItem}>
                            <InputBaseStyled
                                placeholder="Pesquisar…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={e => updateFormInput({...formInput, search: e.target.value})}
                                type='text'
                            />
                        </form>
                    </Search>
            
                </Toolbar>

                <Toolbar sx={{ backgroundColor: '#a18fcf' }}>
                    <Box sx={{ margin: 'auto'}} >

                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <ButtonStyled id="servicos-button">
                                Home
                            </ButtonStyled>
                        </Link>

                        <Link to="/itens" style={{ textDecoration: 'none' }}>
                            <ButtonStyled id="itens-button">
                                Itens
                            </ButtonStyled>
                        </Link>
                        
                        <Link to="/agendamento" style={{ textDecoration: 'none' }}>
                            <ButtonStyled id="servicos-button" >
                                Serviços
                            </ButtonStyled>
                        </Link>

                        <Link to="/sobre" style={{ textDecoration: 'none' }}>
                            <ButtonStyled id="sobrenos-button">
                                Sobre nós
                            </ButtonStyled>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}