import DGXLogo from "./components/DGXLogo";
import {DGXDropdown} from "./components/DGXDropdown";
import DGXContainer from "./components/DGXContainer";
import "./App.css";
import "./fonts/font.css";
import { useCallback, useState } from "react";
import list from './mock/drop-items.json';
import formData from './mock/form-data.json';
// const backendValue = list.find((x)=>x.key === formData.dropdown);
const backendValue = formData.dropdown;
let emptyValue = "هیچ!";
function App() {
  const [carValue,setCarValue] = useState(backendValue);
  const onSelect = useCallback((option)=>{
    setCarValue(option);
  },[]);
  function getOptionValue(option){
    return option.key;
  }
  return (
    <div
      id="app"
      className="flex"
      style={{ backgroundImage: 'url("/assets/pixel-arts/pixel-wall.png")' }}
    >
      <DGXContainer className="top">
        <DGXLogo className="flex" />
        <div className="mt">
          <DGXDropdown optionList={list} onSelect={onSelect} value={carValue} getOptionValue={getOptionValue}/>
        </div>
        <div className="result">{carValue||emptyValue}</div>
      </DGXContainer>
    </div>
  );
}

export default App;
