import React, { useState, useRef } from 'react';

const InputWithRef = () => {
  const [valueRefInput, setRefValue] = useState('');
  const inputValueRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // funcToInterceptInputValue(e.target.value);
    if (inputValueRef.current) {
      setRefValue(inputValueRef.current.value);
    }
  };

  return (
    <>
      <input type='text' ref={inputValueRef} onChange={onChangeInput} name='value' />
      <div>inputValueRef = {inputValueRef.current ? inputValueRef.current.value : 'значение не определено'}</div>
      <div>valueRefInput = {valueRefInput}</div>
    </>
  );
};

const Input = () => {
  const [valueInput, setValue] = useState('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input value={valueInput} onChange={onChangeInput} name='value' />
      <div>valueInput = {valueInput}</div>
    </>
  );
};

export const App = () => (
  <div className='App'>
    <Input />
    <InputWithRef />
  </div>
);
