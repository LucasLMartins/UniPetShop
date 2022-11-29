import 'react-calendar/dist/Calendar.css';
import api from '../api.js'
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import '../styles/agendamento.css'
import { useNavigate, useLocation } from "react-router-dom";
import FooterPetShop from '../Components/Footer.jsx';

function Agendamento() {

  const [scheduleState, setScheduleState] = useState({ nomeCliente: '', telCliente: '', cpfCliente: '', especieAnimal: 'Cachorro', tipoAgendamento: 'Banho', porteAnimal: 'Pequeno porte', dataAgendamento: '', appt: '' })

  const navigate = useNavigate();


  function Schedule() {
    let nomeCliente = document.getElementById('nomeCliente').value
    let telCliente = document.getElementById('telCliente').value
    let cpfCliente = document.getElementById('cpfCliente').value
    let tipoAnimal = document.getElementById('tipoAnimal').value
    let tipoAgendamento = document.getElementById('tipoAgendamento').value
    let porteAnimal = document.getElementById('porteAnimal').value
    let data_agendamento = document.getElementById('data_agendamento').value
    let appt = document.getElementById('appt').value

    if (nomeCliente !== '' && telCliente !== "" && cpfCliente !== "" && tipoAnimal !== "" && tipoAgendamento !== "" && porteAnimal !== "" && data_agendamento !== "" && appt !== "") {
      fetch('http://localhost:5000/agendamento/schedule', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(scheduleState)
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
    <div className='agendamento'>
      <Header />
      <div class="full-content">
        <h1 className='centralizameio'>Banho e Tosa</h1>
        <div className='boxAgendamento'>

          <form>
            <fieldset className='fieldAgendamento'>
              <legend id='legendAgendamento'><b>Realizar Agendamento</b></legend>

              <div className='boxInput'>
                {/* <label for="nome" className='labelInput'>Nome</label> */}
                <input placeholder='Nome' id='nomeCliente' required type="text" name="nome" className='inputUser' onChange={e => setScheduleState({ ...scheduleState, nomeCliente: e.target.value })} />
              </div>
              <br></br><br></br>


              <div className='boxInput'>
                {/* <label for="email" className='labelInput'>Telefone</label> */}
                <input placeholder='Telefone' id='telCliente' required type="text" name="telefone" className='inputUser' onChange={e => setScheduleState({ ...scheduleState, telCliente: e.target.value })} />
              </div>
              <br></br><br></br>

              <div className='boxInput'>
                {/* <label for="cpf" className='labelInput'>CPF</label> */}
                <input placeholder='CPF' id='cpfCliente' required type="tel" name="cpf" className='inputUser' onChange={e => setScheduleState({ ...scheduleState, cpfCliente: e.target.value })} />
              </div>
              <br></br><br></br>

              <div className='boxInput'>
                <label className='labelInput' id='tipoAnimal'>Tipo Animal</label>
                <br></br>
                <select id='tipoAnimal' className='selectUser' required onChange={e => setScheduleState({ ...scheduleState, especieAnimal: e.target.value })} >
                  <option value='Cachorro'>Cachorro</option>
                  <option value='Gato'>Gato</option>
                  <option value='Macaco'>Macaco</option>
                </select>
              </div>
              <br></br><br></br>

              <div className='boxInput'>
                <label className='labelInput'>Serviço</label>
                <br></br>
                <select id='tipoAgendamento' required className='selectUser' onChange={e => setScheduleState({ ...scheduleState, tipoAgendamento: e.target.value })}>
                  <option value='Banho'>Banho 40.0$</option>
                  <option value='Tosa'>Tosa 20.0$</option>
                  <option value='Banho e tosa'>Banho e tosa 60.0$</option>
                </select>
              </div>
              <br></br><br></br>

              <div className='boxInput'>
                <label className='labelInput'>Porte</label>
                <br></br>
                <select id='porteAnimal' name='porte' required className='selectUser' onChange={e => setScheduleState({ ...scheduleState, porteAnimal: e.target.value })}>
                  <option value='Pequeno porte'>Pequeno porte</option>
                  <option value='Médio porte'>Médio Porte</option>
                  <option value='Grande porte'>Grande Porte</option>
                </select>
              </div>
              <br></br><br></br>

              <label for="data_agendamento" id='labelData'><b>Dia e Hora</b></label>
              <input type="Date" name="data_agendamento" id="data_agendamento" required min="2022-11-23" onChange={e => setScheduleState({ ...scheduleState, dataAgendamento: e.target.value })} />

              <input type="time" id="appt" name="appt" min="09:00" max="18:00" required onChange={e => setScheduleState({ ...scheduleState, appt: e.target.value })} />
              <br></br>
              <br></br>

              <button onClick={() => Schedule()} id='submit' name='submite'>Agendar</button>

            </fieldset>
          </form>

        </div>

      </div>
      <FooterPetShop />
    </div>


  )
};

export default Agendamento;