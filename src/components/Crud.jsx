import {db} from '../firebase';
import React,{useState} from 'react';


function Crud(props) {

  //Constante para mostrar en el html las tareas
  const [tareas, setTareas] = useState([])
  //Constante para agregar la tarea
  const [tarea, setTarea] = useState('')
  //Constante para agregar la tarea
  const [fecha, setFecha] = useState('')
  //Constante para edicion obtener id
  const [id, setId] = useState('')

  //Constante bandera para swichear entre agregar y editar
  const [modoEdicion, setModoEdicion] = useState(false)

  React.useEffect(() => {

    //Funcion asyc para obterner datos
    const obtenerDatos = async () => {
      try {
        const data = await db.collection(props.user.uid).get()
        console.log(data.docs)
        const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        console.log(arrayData)
        setTareas(arrayData)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerDatos()

  }, [])

  //funcion para agregar
  const agregar = async (e) => {
    console.log("Se esta ejecutando la funcion Agregar")
    e.preventDefault()
    //Validación para saber si esta llena o vacia la tarea
    if(!tarea.trim() | !fecha.trim()){
      console.log("Falta un Campo")
      return
    }

    //Colocamos un try y catch por que la funcion es async
    //Vamos a invocar a db y firestore
    try {
      //Declaramos un objeto para enviar todos los campos que enviaremos
      const nuevaTarea = {
        Name: tarea,
        Date: fecha
      }

      //Codigo para agregar la tarea en firebase codigo de plataforma
      const data = await db.collection(props.user.uid).add(nuevaTarea)

      //Con esto actualizo la lista sin dar refres prueba antes de poner
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])      

      //Limpio tarea
      setTarea('')
      setFecha('')

    } catch (error) {
      console.log(error)
    }

    console.log(tarea)
  }

  //Funcion eliminar registros
  const eliminar = async (id) => {
    try {
      console.log(id)
      await db.collection(props.user.uid).doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      
      console.log("Arreglo completo",tareas)
      console.log("Arreglo Filtrado",arrayFiltrado)
      
      setTareas(arrayFiltrado)

    } catch (error) {
      console.log(error)
    }
  }


  //Funcion para activar la edición
  const activarEdicion = (item) =>{
    setModoEdicion(true)
    console.log("Elemento name",item.Name)
    setTarea(item.Name)
    console.log("Elemento date",item.Date)
    setFecha(item.Date)
    console.log("Elemento id",item.id)
    setId(item.id)
  }

  const editar = async (e) => {
    console.log("Se esta ejecutando la funcion editar")
    e.preventDefault()
    if(!tarea.trim() | !fecha.trim()){
      console.log("Falta un Campo")
      return
    }

    try {
      //Declarar un objeto para mandar los datos actualizados
      const editarTarea = {
        Name: tarea,
        Date: fecha
      }

      await db.collection(props.user.uid).doc(id).update(editarTarea)

      //Actulizar en pantalla sin refescar
      const arrayEditado = tareas.map(item => (
        item.id === id ? editarTarea : item
      ))

      setTareas(arrayEditado)

      //Limpiar constantes
      setTarea('')
      setFecha('')
      setId('')
      setModoEdicion(false)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Fondo">
    <div className="container">
      <h1>Examen Unidad 2 React y Firebase</h1>
      <div className="row">
        <div className="col-md-6">
            <h3>Lista de Tareas</h3>
            <ul className="list-group">
            {
                tareas.map(item => (
                  <li className="list-group-item" key={item.id}>
                  <span>{item.Name}</span>
                  <br/>
                  <span>{item.Date}</span>
                    <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(item.id)}>
                        Eliminar
                    </button>
                    <button 
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={() => activarEdicion(item)}
                    >
                        Editar
                    </button>
                </li>
                ))
            }
            </ul>
        </div>
        
        <div className="col-md-6">
            <h3>{
                modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
              }</h3>
            <form onSubmit={
              modoEdicion ? editar : agregar
              }>
              <input 
                type="text" 
                className="form-control mb-2"
                placeholder='Ingrese Tarea'
                value={tarea}
                onChange={e => setTarea(e.target.value)}
              />
              <input 
                type="datetime-local"
                className="form-control mb-2"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
              />
              <button
                type='submit'
                className={
                  modoEdicion ? "btn btn-warning btn-block btn-sm" : "btn btn-dark btn-block btn-sm"
                }
              >{
                modoEdicion ? 'Actualizar' : 'Guardar'
              }</button>
            </form>
        </div>
    </div>

    </div>

    </div>
  );
}
export default Crud;
