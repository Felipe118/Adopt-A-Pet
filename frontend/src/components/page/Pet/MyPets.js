import { useState,useEffect } from "react";

const MyPets = () => {
    const [pets,setPets] = useState([])
    return(
        <section>
            <h1>MyPets</h1>
            <div>
                {pets.length > 0 && <p>Meus Pets cadastrados</p>}
                {pets.length === 0 && <p>Não há Pets Cadastrados</p>}
            </div>
        </section>
    );

}
export default MyPets 