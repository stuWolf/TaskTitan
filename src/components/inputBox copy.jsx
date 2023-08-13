import React, { useState, useEffect } from "react";


function InputBox({ id, label, value: externalValue, onChange, isDisabled}) {
    const [internalValue, setInternalValue] = useState(externalValue || "");
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setInternalValue(externalValue);
    }, [externalValue]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInternalValue(inputValue);


        // Assuming an error if the input is empty.
        const errorFlag = !inputValue;
        setHasError(errorFlag);

        // Inform parent component about the change
        if (props.onChange) {
            props.onChange(inputValue, errorFlag);
        }

        if (inputValue) {
            e.target.parentNode.classList.add('has-value');
        } else {
            e.target.parentNode.classList.remove('has-value');
        }

    };

    return (
        <div className="input-wrapper">
            <input 
                id={id}
                value={internalValue}
                onChange={handleInputChange}
                style={hasError ? {border: '1px solid red'} : {}}
                disabled={isDisabled}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}
export default InputBox;