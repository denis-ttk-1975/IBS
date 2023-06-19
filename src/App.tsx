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

const InputWithExternalState = (props: { valueInput: string; externalSetState: React.Dispatch<React.SetStateAction<string>> }) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.externalSetState(e.target.value);
  };

  return (
    <>
      <input value={props.valueInput} onChange={onChangeInput} name='value3' />
    </>
  );
};

export const App = () => {
  const [valueInput3, setValue3] = useState('');
  return (
    <div className='App'>
      <Input />
      <InputWithRef />
      <InputWithExternalState externalSetState={setValue3} valueInput={valueInput3} />
      <div>valueInputWithExternalState = {valueInput3}</div>
    </div>
  );
};
