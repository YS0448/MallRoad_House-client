import React from 'react';
import DiningForm from './DiningForm';
import {Toast} from '../../common/AlertService';
const Dining=()=>{
    return(
        <>
            <DiningForm />
            <Toast/>
        </>
    )
}

export default Dining;