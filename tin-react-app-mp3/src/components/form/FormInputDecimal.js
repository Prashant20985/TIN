function FormInputDecimal(props) {
    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)

    return(
        <>
            <label className="label" htmlFor={props.name}>
                {props.label}:
                {props.required && <span className="required">*</span>}
            </label>
            <input 
                type={props.type}
                step={props.step}
                className={`${className} input`}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormInputDecimal;