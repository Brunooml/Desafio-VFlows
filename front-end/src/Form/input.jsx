import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const {
    fieldName, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <label htmlFor={fieldName} key={fieldName}>{fieldName}</label>
      <br />
      <input ref={inputRef} {...rest} />
      <br />
      { error && <span className="text-red-500">{ error }</span>}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
