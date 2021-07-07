import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserInterface, UserListItems } from '../../store/ducks/users/types';
import { searchUserDisengaged } from '../../store/ducks/users/sagas';
import debounce from 'lodash.debounce';
import { cleanAction, loadGetUserDisengaged } from '../../store/ducks/users/actions';

import { ApplicationState } from '../../store';


export default function Specialities() {
    const dispatch = useDispatch();
    return (
        <>
            <div>
                <h2>Principal</h2>

                <br />

                <h2>Secundária</h2>


            </div>
        </>
    );
}
