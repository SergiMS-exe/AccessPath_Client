import React, { useState } from 'react'

export const useForm = <T extends Object>(form: T) => {
    const [state, setState] = useState(form);
    const [valid, setValid] = useState(false);
    const onChange = (value: string, field: keyof T) => {
        //setValid(checkForm());
        setState({
        ...state,
        [field]: value
        })
    }

    /*const checkForm = () => {
        for (const key in state) {
        console.log(key);
        
        console.log(state[key]);
        
        if ((state[key] as string).trim().length < 2) {
            return false
        }
        }
        return true
    }*/
    return { ...state, onChange, valid }
}
