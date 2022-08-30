import { useRef } from 'react';
import './App.css';

function App() {
  const inputFileRef = useRef(null);

  const clickOnTheInputFile = () => {
    return inputFileRef.current.click();
  }
  
  return (
    <div className='App'>
      <button onClick={clickOnTheInputFile}>SELECT IMAGE</button>
      <input type='file' ref={inputFileRef} style={{"display": "none"}}></input>
    </div>
  );
}

export default App;
