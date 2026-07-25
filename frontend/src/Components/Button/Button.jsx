import React from 'react'

const Button = ({
    type,
    eventHandler,
    txt,
    style
}) => {
    return (
        <button  type={type} eventHandler={eventHandler}>
            {txt}
        </button>
    )
}

export default Button
