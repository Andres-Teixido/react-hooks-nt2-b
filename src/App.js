import React, { useState, useEffect } from "react";
import Vehiculo from "./components/vehiculo"
import "./style.css";

const API_URL='https://us-central1-be-tp3-a.cloudfunctions.net/app/api/read';

/**
 * Ejemplo con Hooks de estado
 */

export default function App() {

  // Declaro un estado `contador` y su callback de actualizacion `setContador`
  const [contador, setContador] = useState(0)

  const [decremento, setDec] = useState(10);

  const [vehiculos, setVehiculos] = useState([]);


  // Aqui se ejecuta solo cuando cambia el contador
  useEffect(() => {
    console.log("Aqui detecto cambio el estado de contador: ", contador)
  }, [contador])


  // Aqui se ejecuta solo cuando cambia el decremento
  useEffect(() => {
    console.log("Aqui detecto el cambio de decremento", decremento)
  }, [decremento])


  // Aqui se ejecuta ni bien se cambia el contador o el decremento.
  useEffect(() => {
    if (contador === decremento){
      alert("Se igualaron los estados");
    }
  }, [contador, decremento])


  // Aqui mando a buscar la data a la API (listado de vehiculos)
  useEffect( buscarVehiculos, [])


  function buscarVehiculos(){

    fetch(API_URL).then((res) => {
      return res.json()
    })
    .then(data => {
      setVehiculos(data);
    })

  }

  function actualizaEstados(){
    setContador(contador+1)
    setDec(decremento-1)
  }

  return (
    <div>
      <h1>Ejemplo Hooks de estado</h1>
      <br />
      <button onClick={buscarVehiculos}> Actualizar listado </button>
      <ul>
        {
          vehiculos.map(vehiculo => {
            return (
              <Vehiculo key={vehiculo.id} marca={vehiculo.marca} modelo={vehiculo.modelo} />
            )
          })
        }
        
      </ul>
    </div>
  );
}
