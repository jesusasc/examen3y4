import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Admin from "./components/Admin";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import {auth} from "./firebase"

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)

  //recibir el estado de un usuario con onAuthStateChange
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log("Usuario esta como", user)
      if(user){
        setFirebaseUser(user)
      }
      else{
        setFirebaseUser(null)
      }
    })
  })

  return firebaseUser !== false ? (
      <Router>
        <div className="container">
          <Navbar firebaseUser = {firebaseUser}/>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/" exact>
              Ruta Pagina Principal
              <div className='contenedor'>
                <p>
                  Hola
                </p>
                <ul>
                  <li>ESTE ES LA PAGINA</li>
                  <li>PRINCIPAL</li>
                  <li>INICIE SESION</li>
                </ul>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
  ) : (
    <p>Cargando..</p>
  )
}

export default App;
