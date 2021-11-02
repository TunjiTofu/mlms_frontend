import React from 'react'
import {useStyles} from "../Styles/AuthStyle";


function FormErrors(props) {
    const classes = useStyles()
    return (
        <div className={classes.fieldError}>
            {props.children}
        </div>
    )
}

export default FormErrors
