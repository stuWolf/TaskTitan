
// In this version, the box sends out it's typed value from on change
// hasError acts as a flag to set the boarder red


import React, { useState, useEffect, useRef } from 'react';
import '../Search.css';
function InputBox({ id, label,  setValue, initialValue = "", isDisabled, onChange, isSubmitted  }) {  // Added onChange to the destructured props
    // const [value, setValue] = useState(initialValue);
    const [hasError, setHasError] = useState(false);
    // const [value, setValue] = useState(initialValue);
    const [internalValue, setInternalValue] = useState(initialValue  || "");
    const inputRef = useRef(null);  // Reference to the input element
   // needs to be permanently monitored, not just on change
    useEffect(() => {
        if (isSubmitted && !internalValue) {
            setHasError(true);
        } else {
            // setHasError(false);
            setInternalValue(setValue)
            
        }
        // setInternalValue()
    }, [isSubmitted]);

    useEffect(() => {
        setInternalValue(setValue);
    }, [setValue]);

    useEffect(() => {
        // Toggle the class based on the internalValue
        if (internalValue && inputRef.current) {
            inputRef.current.parentNode.classList.add('has-value');
        } else if (inputRef.current) {
            inputRef.current.parentNode.classList.remove('has-value');
        }
    }, [internalValue]);



    const handleChange = (e) => {
        // const inputValue = e.target.value;
        setInternalValue(e.target.value);
console.log('inputvalue    '  + internalValue)
       // You can set your error conditions here. 
        
        // this is needed for the style element
        if (isSubmitted && !e.target.value) {
            setHasError(true);
        } else {
            setHasError(false);
        }

        if (onChange) {
            onChange(e.target.value, hasError);
        }

        if (e.target.value) {
            e.target.parentNode.classList.add('has-value');
        } else {
            e.target.parentNode.classList.remove('has-value');
        }
    };
// console.log('haserror from input box  ' + hasError)
    return (
        <div className="input-wrapper">
            <input 
                ref={inputRef}  // Attach the reference to the input element
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
