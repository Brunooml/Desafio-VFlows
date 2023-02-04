/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

function Checkbox({ name, label, ...rest }) {
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
      <input ref={inputRef} type="checkbox" {...rest} />

      { error && <span>{ error }</span>}
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Checkbox;
