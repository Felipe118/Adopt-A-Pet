import api from '../../../utils/api'

import {useState,useEffect } from 'react'
import formStyles from '../../form/Form.module.css'
import styles from "./Profile.module.css"

import useFlashMessage from '../../../hooks/useFlashMessage'
import Input from '../../form/input'




function Profile() {
    const [user,setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(()=>{
        api.get('/users/checkuser',  {
          headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        }).then((response) =>{
          setUser(response.data)
        })

    },[token])

    function handleChange(e){
      setUser({...user, [e.target.name]: e.target.value})
    }
    function onFileChange(e){ 
     
      setUser({...user, [e.target.name]: e.target.files[0]})
    }

    async function handleSubmit(e){
      e.preventDefault()
     
      let msgType = 'success'

      const formData = new FormData()
      const userFormData = await Object.keys(user).forEach((key) => 
        formData.append(key,user[key]),
      )
      formData.append('user', userFormData)

      const data = await api.patch(`/users/edit/${user._id, formData}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        return response.data

      }).catch((erro) => {
        msgType = 'error'
        return erro.response.data
      })

      setFlashMessage(data.message, msgType)

    }

    return (
        
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                <p>Previe Image</p>
            </div>
            
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
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
                   value={user.name || ''}
                />

                  <Input 
                   text="Telefone"
                   type="text"
                   name="phone"
                   placeholder="Digite seu telefone"
                   handleOnChange={handleChange}
                   value={user.phone || ''}
                />

                  <Input 
                   text="Senha"
                   type="password"
                   name="password"
                   placeholder="Digite sua senha"
                   handleOnChange={handleChange}
                   value={user.password || ''}
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