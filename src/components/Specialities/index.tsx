import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserListItems, MainSpecialtyInterface, SpecialtiesUserInterface } from '../../store/ducks/users/types'


interface IProps{

    user: UserListItems
    
}

export default function Specialities(props: any) {
    const { user } = props
   
    return (
        <>
            <div>
                <h2>Principal</h2>

                <br />
                <p>{user?.name}</p>

                <br />

                <h2>Secundária</h2>


            </div>
        </>
    );
}
