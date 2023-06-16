import React, { useState } from 'react';

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
  </div>
);
