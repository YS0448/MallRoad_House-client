import React from 'react';
import DrinksForm from './DrinksForm';
import {Toast} from '../../common/AlertService';
const TakeAway=()=>{
    return(
        <>
            <DrinksForm />
            <Toast/>
        </>
    )
}

export default TakeAway;