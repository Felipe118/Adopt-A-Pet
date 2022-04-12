
import { useState } from "react";
import formStyles from './Form.module.css';
import Input from "./input";

import Select from './Select'

const PetForm = ({handleSubmit,petData,btnText}) => {
    
   const [pet,setPet] = useState(petData || {})
   const [preview,setpreview] = useState([])
   const colors = ["Branco","Preto","Cinza","Caramelo","Mesclado"]

function onFileChange(e){

}
function handleChange(e){

}
function handleColor(e){

}
    return(
       <form className={formStyles.form_container} action="">
           <Input
             text="Imagem do Pet"
             type="file"
             name="images"
             handleOnChange={onFileChange}
             multiple={true}
           />
            <Input
             text="Nome do Pet"
             type="text"
             name="name"
             placeholder="Nome do Pet"
             handleOnChange={handleChange}
             value = {pet.name || ''}
           />
            <Input
             text="Idade do Pet"
             type="text"
             name="age"
             placeholder="Idade do Pet"
             handleOnChange={handleChange}
             value = {pet.name || ''}
           />
           <Input
             text="Peso do Pet"
             type="number"
             name="weight"
             placeholder="Peso do Pet"
             handleOnChange={handleChange}
             value = {pet.name || ''}
           />
            <Select
               name="color"
               text="Selecione a cor"
               options={colors}
               handleOnChange={handleColor}
               value={pet.color || ''}
            />
           <input type="submit" value={btnText} />
       </form>
    );

}
export default PetForm 