import React from 'react';

import './input.scss';

function Input(props) {
    // console.log(props);
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange ? (e)=>props.onChange(e) : null}
        />
    );
}

export default Input;