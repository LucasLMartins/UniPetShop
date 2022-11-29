import { useState, useEffect } from "react";
import { logDOM } from "@testing-library/react";
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './Pages/Home'
import Agendamento from "./Pages/Agendamento"
import Sobre from "./Pages/Sobre"
import Itens from "./Pages/Itens"
import Admin from "./Pages/Admin"
import Item from "./Pages/Item"
import Carrinho from "./Pages/Carrinho"

import api from './api.js'
import axios from 'axios'

function App() {


  return (
      <div className="Rotas">
        <Router>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/agendamento" element={<Agendamento />}/>
              <Route path="/sobre" element={<Sobre />}></Route>
              <Route path="/itens" element={<Itens />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/item" element={<Item />}></Route>
              <Route path="/carrinho" element={<Carrinho />}></Route>
          </Routes>
        </Router>

      </div>
  );
}

export default App;