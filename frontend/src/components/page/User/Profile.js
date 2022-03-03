import {useState,useEffect } from 'react'
import formStyles from '../../form/Form.module.css'
import styles from "./Profile.module.css"

import Input from '../../form/input'
import { UserProvider } from '../../../context/UserContext'



function Profile() {
    const [user,setUser] = useState({})

    function handleChange(){

    }
    function onFileChange(){

    }

    return (
        
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                <p>Previe Image</p>
            </div>
            
            <form className={formStyles.form_container}>
                <Input 
                  text="imagem"
                  type="file"
                  name="image"
                  handleOnChange={onFileChange}
                />

                 <Input 
                  text="E-mail"
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  handleOnChange={handleChange}
                  value={user.email || ''}
                />

                 <Input 
                   text="Nome"
                   type="text"
                   name="name"
                   placeholder="Digite seu nome"
                   handleOnChange={handleChange}
                   value={user.email || ''}
                />

                  <Input 
                   text="Telefone"
                   type="text"
                   name="phone"
                   placeholder="Digite seu telefone"
                   handleOnChange={handleChange}
                   value={user.email || ''}
                />

                  <Input 
                   text="Senha"
                   type="password"
                   name="password"
                   placeholder="Digite sua senha"
                   handleOnChange={handleChange}
                   value={user.email || ''}
                />

                  <Input 
                   text="Confirmação de senha "
                   type="password"
                   name="confirmpassword"
                   placeholder="Confirme sua senha"
                   handleOnChange={handleChange}
                />

                <input type="submit" value="Editar"/>

            </form>
        </section>
    )
}
export default Profile