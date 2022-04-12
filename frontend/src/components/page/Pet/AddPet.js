import styles from './AddPet.module.css'

//api
import api from '../../../utils/api';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';


import PetForm from '../../form/PetForm';


const AddPet = () => {
  
    return(
       <section className={styles.addpet_header}>
           <div>
               <h1>Cadastrar um Pet</h1>
               <p>Depois Ele ficará disponível para adoção</p>
           </div>
            <PetForm btnText="Cadastrar Pet" />
       </section>
    );

}
export default AddPet 