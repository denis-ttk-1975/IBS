import React, { useState, useRef, forwardRef, useEffect } from 'react';

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

const useCountdown = (initCount: number) => {
    const [time, setCounter] = useState<number>(initCount);
  
    let timeoutID: NodeJS.Timeout;
  
    useEffect(() => {
      timeoutID = setTimeout(() => {
        if (time === 0) {
          clearTimeout(timeoutID);
          return;
        }
        setCounter((prev) => {
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timeoutID);
    }, [initCount, time]);
  
    const reset = () => {
      clearTimeout(timeoutID);
      setCounter(() => {
        return 10;
      });
    };
  
    return [time, reset];
  };

export const App = () => {
  const [valueInput3, setValue3] = useState('');
  const refForwardValue = useRef(null);
  const [valueInput4, setValue4] = useState('');
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  let [time, reset] = useCountdown(10);
 

  useEffect(() => {
   console.log("Hello from App");
  });
  
  const handleClick = () => {
  	
     setCounter1((c) => ++c)
     setCounter2((c) => ++c)
   
  }

  return (
    <>
        <div className='App'>
            <Input />
            <InputWithRef />
            <InputWithExternalState externalSetState={setValue3} valueInput={valueInput3} />
            <div>valueInputWithExternalState = {valueInput3}</div>
            <InputWithForwardRef externalSetState={setValue4} valueInput={valueInput4} ref={refForwardValue} />
            <div>valueInputWithForwardRef = {valueInput4}</div>
        </div>

        <div className="App">
            <button onClick={handleClick}>Click</button>
            <div>{counter1}</div>
            <div>{counter2}</div>
        </div>
        <div>

        <div style={{ fontSize: 50, textAlign: "center" }}>COUNTDOWN TIMER</div>
        <div style={{ fontSize: 100, textAlign: "center" }}> {typeof time === 'number' ? time : null}</div>
        <div style={{ textAlign: "center" }}>
        <button style={{ fontSize: 50 }} onClick={reset as (() => void)}>
            reset
        </button>
        </div>
    </div>
    </>
);
};
