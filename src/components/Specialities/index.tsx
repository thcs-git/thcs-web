import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserInterface, UserListItems } from '../../store/ducks/users/types';

import { ApplicationState } from '../../store';


export default function Specialities() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const userState = useSelector((state: ApplicationState) => state.users);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        dispatch(searchUserDisengaged(event.target.value));
    }, []);
    const debounceSearchRequest = debounce(handleChangeInput, 900);

    useEffect(() => {
        dispatch(cleanAction());
        dispatch(loadGetUserDisengaged());
    }, [])

    const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, [anchorEl]);

    const handleCloseRowMenu = useCallback(() => {
        setAnchorEl(null);
    }, [anchorEl]);

    return (
        <>
            <div>
                <h2>Principal</h2>

                <br />

                <p>Você está trabalhando nesta empresa, mas você pode mudar quando quiser</p>

                <br />

                <h2>Secundária</h2>

            </div>
        </>
    );
}
