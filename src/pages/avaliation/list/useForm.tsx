import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CareInterface } from '../../../store/ducks/cares/types';

interface IProps{

    care: CareInterface
    
}


export default function Specialities(props: IProps) {
    const { care } = props
   
    return (
        <>
            <div>
                <h2>Principal</h2>

                <br />
                <p>{care?.patient_id?.name}</p>

                <br />

                <h2>Secundária</h2>


            </div>
        </>
    );
}
