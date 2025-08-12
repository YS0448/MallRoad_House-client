import React from 'react';
import TakeAwayForm from './TakeAwayForm';
import {Toast} from '../../common/AlertService';
const TakeAway=()=>{
    return(
        <>
            <TakeAwayForm />
            <Toast/>
        </>
    )
}

export default TakeAway;