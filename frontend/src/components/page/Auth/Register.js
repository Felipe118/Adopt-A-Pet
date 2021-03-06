import Input from '../../form/input'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

//css

import style from '../../form/Form.module.css'

//context
import { Context } from '../../../context/UserContext'


function Register() {

    const [user,setUser] = useState({})
    const {register} = useContext(Context)

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})

    }

    function handleSubmit(e)
    {
        e.preventDefault()

        //enviar um usuário para o banco
        register(user)

    }

    return (
        <section className={style.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text='Nome'
                    type='text'
                    name='name'
                    placeholder='Digite seu nome'
                    handleOnChange = {handleChange}
                />
                <Input
                    text='Telefone'
                    type='text'
                    name='phone'
                    placeholder='Digite seu telefone'
                    handleOnChange = {handleChange}
                />
                <Input
                    text='E-mail'
                    type='text'
                    name='email'
                    placeholder='Digite seu E-mail'
                    handleOnChange = {handleChange}
                />
                  <Input
                    text='Senha'
                    type='password'
                    name='password'
                    placeholder='Digite sua Senha'
                    handleOnChange = {handleChange}
                />
                    <Input
                    text='Confirmação de Senha'
                    type='password'
                    name='confirmpassword'
                    placeholder='Confirme a senha'
                    handleOnChange = {handleChange}
                />
                <input type='submit' value='Cadastrar'/>

            </form>
            <p>
                Já tem conta ? <Link to='/login'>Clique aqui.</Link>
            </p>
        
        </section>
    )
}
export default Register