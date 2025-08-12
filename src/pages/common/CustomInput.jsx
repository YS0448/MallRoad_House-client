import React from 'react';
import '../../assets/styles/components/CustomInput.css';
const CustomInput = ( props )=>{
    return(
        <input 
            {...props}
            className={`input_style ${props.className || ''}`}
        />

    )
}

export default CustomInput;