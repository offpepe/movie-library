/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import PropTypes from 'prop-types';

import userContext from './userContext';

export default function UserProvider ({ children }) {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const value = {
        email,
        setEmail,
        token,
        setToken,
    };
    return (
        <userContext.Provider value={ value } >
            {
                children
            }
        </userContext.Provider>   
    );
}

UserProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
}