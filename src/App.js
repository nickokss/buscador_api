import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  //console.log(searchText);
  const API_KEY="****";

  function searchForPlayer(event) {
    //Set up the correct API call
    var APICallString ="https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
    //Handle the API call
    axios.get(APICallString).then(function (response){
    //SUCCESS
    setPlayerData(response.data);
    }).catch(function (error){
    //ERROR
    console.log(error);
    });
  }

  console.log(playerData);

  return (
    <div className="App">
      <div className="container">
        <h5>Buscador League of legends EUW</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchForPlayer(e)}>Buscar jugador</button>
      </div>
      {JSON.stringify(playerData) != '{}' ? 
      <>
        <p><b>{playerData.name}</b></p>
        <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
        <p>Nivel de invocador {playerData.summonerLevel}</p>
      </> 
      :
      <><p>No hay datos de ese jugador en EUW</p></> 
      }
    </div>
  );
}

export default App;
