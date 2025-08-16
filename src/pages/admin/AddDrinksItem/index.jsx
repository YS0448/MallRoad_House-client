import React from 'react';
import DrinksForm from './DrinksForm';
import {Toast} from '../../common/AlertService';
const Drinks=()=>{
    return(
        <>
            <DrinksForm />
            <Toast/>
        </>
    )
}

export default Drinks;