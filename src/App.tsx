import React, { useState, useRef, forwardRef } from 'react';

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

const InputWithRef = () => {
  const [valueRefInput, setRefValue] = useState('');
  const inputValueRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

const InputWithForwardRef = forwardRef((props: { valueInput: string; externalSetState: React.Dispatch<React.SetStateAction<string>> }, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
  // const [valueRefForwardInput, setRefForwardValue] = useState('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref != null && typeof ref !== 'function' && typeof ref !== 'string' && ref.current != null) {
      console.log(1);
      props.externalSetState(ref.current.value);
    }
  };

  return (
    <>
      <input type='text' ref={ref} onChange={onChangeInput} name='value' />
      <div>inputValueRef = {ref != null && typeof ref !== 'function' && typeof ref !== 'string' && ref.current != null ? ref.current.value : 'значение не определено'}</div>
      <div>valueRefForwardInput = {props.valueInput}</div>
    </>
  );
});

export const App = () => {
  const [valueInput3, setValue3] = useState('');
  const refForwardValue = useRef(null);
  const [valueInput4, setValue4] = useState('');
  return (
    <div className='App'>
      <Input />
      <InputWithRef />
      <InputWithExternalState externalSetState={setValue3} valueInput={valueInput3} />
      <div>valueInputWithExternalState = {valueInput3}</div>
      <InputWithForwardRef externalSetState={setValue4} valueInput={valueInput4} ref={refForwardValue} />
      <div>valueInputWithForwardRef = {valueInput4}</div>
    </div>
  );
};
