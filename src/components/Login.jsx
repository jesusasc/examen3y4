import React, {useState, useCallback} from "react";
import {auth, db} from '../firebase';
//Nota para que funciones agregamos un props al componente principal y envolvemos el componete dentro del withRouter
import { withRouter } from "react-router-dom";

const Login = (props) => {
    //Constantes del formulario
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const [esRegistro, setEsRegistro] = useState(false)

    //Definir funcion de obtener datos
    const enviardatos = e =>{
        e.preventDefault()
        console.log(email)
        console.log(pass)

        if(!email.trim()){
            setError('Rellene el campo email')
            return
        }

        if(!pass.trim()){
            setError('Rellene el campo password')
            return
        }

        setError(null)

        //Comparativa para proceso registro o login
        if(esRegistro){
            //Crear una funcion para registrar
            registrar()
        }
        else{
            login1()
        }
    }

    //Incorporar un hook useCallBack
    const registrar = useCallback(async() => {
            try {
                const res = await auth.createUserWithEmailAndPassword(email, pass) 
                console.log("Resultado del registro", res);

                //Crear una coleccion adicional a los usuarios para tener contro de sus datos
                await db.collection(res.user.uid).add({
                    Name: 'Bienvenido',
                    Date: Date.now()
                })

                setEmail('')
                setPass('')
                setError(null)

                props.history.push('/admin')

            } catch (error) {
                console.log(error);
                if(error.code === 'auth/invalid-email'){
                    setError('La dirección de correo electrónico está mal formateada')
                }

                if(error.code === 'auth/email-already-in-use'){
                    setError('La dirección de correo electrónico ya está siendo utilizada por otra cuenta.')
                }
            }
        },
        [email, pass]
    )

    const login1 = useCallback(async() => {
            try {
                const res = await auth.signInWithEmailAndPassword(email, pass)
                console.log("Resltado login", res.user)

                setEmail('')
                setPass('')
                setError(null)
                props.history.push('/admin')

            } catch (error) {
                console.log(error)
                if(error.code === 'auth/user-not-found'){
                    setError('No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.')
                }

                if(error.code === 'auth/wrong-password'){
                    setError('La contraseña no es válida o el usuario no tiene contraseña.')
                }
            }
        },
        [email, pass] //Nota el useCallback Requiere que los parametros usados se agregen en los corchetes finales
    )

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de Usuario' : 'Login de acceso'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={enviardatos}>
                        {
                            error ? (<div className="alert alert-warning">
                                        {error}
                                    </div>) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange = {e => setEmail(e.target.value)}
                            value= {email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña minimo 6 caracteres"
                            minlength="6"
                            onChange = {e => setPass(e.target.value)}
                            value= {pass}
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            Ingresar
                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                            onClick = {() => setEsRegistro(!esRegistro)}
                        >
                            {
                                esRegistro ? '¿Ya Tienes Cuenta?' : '¿No tienes cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter (Login)
