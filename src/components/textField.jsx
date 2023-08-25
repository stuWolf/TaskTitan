import React, { useState, useEffect, useRef } from 'react';
import '../Search.css';

function TextField({ 
    id, 
    label,  
    setValue, 
    initialValue = "", 
    isDisabled, 
    onChange, 
    isSubmitted  
}) {
    const [hasError, setHasError] = useState(false);
    const [internalValue, setInternalValue] = useState(initialValue  || "");
    const inputRef = useRef(null);  // Reference to the input (textarea) element

    useEffect(() => {
        if (isSubmitted && !internalValue) {
            setHasError(true);
        } else {
            setInternalValue(setValue);
        }
    }, [isSubmitted]);

    useEffect(() => {
        setInternalValue(setValue);
    }, [setValue]);

    useEffect(() => {
        if (internalValue && inputRef.current) {
            inputRef.current.parentNode.classList.add('has-value');
        } else if (inputRef.current) {
            inputRef.current.parentNode.classList.remove('has-value');
        }
    }, [internalValue]);

    const handleChange = (e) => {
        setInternalValue(e.target.value);

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

    return (
        <div className="textField-wrapper">
            <textarea   // Changed this from <input> to <textarea>
                ref={inputRef}  
                id={id}
                value={internalValue}
                onChange={handleChange}
                style={hasError ? {border: '1px solid red'} : {}}
                disabled={isDisabled}
                rows={4}  // Example value, adjust as needed
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default TextField;
