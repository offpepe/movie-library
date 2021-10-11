/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import PropTypes from 'prop-types';

import userContext from './userContext';

export default function UserProvider ({ children }) {
    const [email, setEmail] = useState('');  
    const value = {
        email,
        setEmail,
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