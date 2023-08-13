
// In this version, the box sends out it's typed value from on change
// hasError acts as a flag to set the boarder red


import React, { useState, useEffect } from 'react';
import '../Search.css';
function InputBox({ id, label,  initialValue = "", isDisabled, onChange, isSubmitted  }) {  // Added onChange to the destructured props
    // const [value, setValue] = useState(initialValue);
    const [hasError, setHasError] = useState(false);
    // const [value, setValue] = useState(initialValue);
    const [internalValue, setInternalValue] = useState(initialValue  || "");

    // // Update internal value when external value changes
    // useEffect(() => {
    //     setInternalValue(externalValue);
    // }, [externalValue]);

    // const handleInputChange = (e) => {
    //     const inputValue = e.target.value;
    //     setInternalValue(inputValue);
    //       // You can set your error conditions here. 
    //     // For now, I'm assuming an error if the input is empty.
    //     const errorFlag = !externalValue;
    //     setHasError(errorFlag);
    // };

    useEffect(() => {
        if (isSubmitted && !internalValue) {
            setHasError(true);
        } else {
            // setHasError(false);
        }
        // setInternalValue()
    }, [isSubmitted]);


    const handleChange = (e) => {
        const inputValue = e.target.value;
        setInternalValue(inputValue);

       // You can set your error conditions here. 
        // For now, I'm assuming an error if the input is empty.

        
      
        // setHasError(errorFlag);

        // // Inform parent component about the change
        // if (onChange) {  // Replaced props.onChange with onChange
        //     onChange(inputValue, errorFlag);
        // }
        // Inform parent component about the change

        if (isSubmitted && !inputValue) {
            setHasError(true);
        } else {
            setHasError(false);
        }
        if (onChange) {
            onChange(inputValue, hasError);
        }

        if (inputValue) {
            e.target.parentNode.classList.add('has-value');
        } else {
            e.target.parentNode.classList.remove('has-value');
        }
    };
console.log('haserror from input box  ' + hasError)
    return (
        <div className="input-wrapper">
            <input 
                id={id}
                value={internalValue}
                onChange={handleChange}
                style={hasError ? {border: '1px solid red'} : {}}
                disabled={isDisabled}
                // submitted={isSubmitted}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default InputBox;
