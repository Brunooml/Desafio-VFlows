/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function InputAcesso({ name, ...rest }) {
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
      <input ref={inputRef} {...rest} />

      { error && <span>{ error }</span>}
    </div>
  );
}

export default InputAcesso;
