import React from 'react';
import DiningForm from './DiningForm';
import {Toast} from '../../common/AlertService';
const TakeAway=()=>{
    return(
        <>
            <DiningForm />
            <Toast/>
        </>
    )
}

export default TakeAway;