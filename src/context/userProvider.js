/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import PropTypes from 'prop-types';

import userContext from './userContext';

export default function userProvider ({ children }) {
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

userProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
}