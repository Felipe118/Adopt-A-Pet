import styles from './Select.module.css'

const Select = ({text,name,options,hanldeOnChange,value}) => {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}></label>
            <select name={name} id={name} onChange={hanldeOnChange} value={value || ''}>
                <option value="">Selecione</option>
                {options.map((option) => (
                     <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default Select