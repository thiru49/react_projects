import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});


function App() {
  return (
    <RecoilRoot>
      <h1>welcome</h1>
      <CharacterCounter />
     {/*  <Use/> */}
    </RecoilRoot>
  );
}


/* function Use( ){
  const [text,setText] = useRecoilState(textState)
  return<>
  {text}
  <input type="text" onChange={(e)=>setText(e.target.value)} />
  </>
} */
function CharacterCounter() {
  return (
    <div>
      <TextInput />
     <CharacterCount />
    </div>
  );
}
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

export default App