import { useCallback, useEffect } from "react";
import { useState } from "react";
export function DGXDropdown(props) {
  const [showList, setShowList] = useState(false);
  const [emptyStateText,setEmptyStateText] = useState("لطفا یک گزینه را انتخاب کنید");
  const onValueHolderClick = useCallback(() => {
    setShowList(!showList);
  },[showList]);
  const onOptionSelect = useCallback((option) => {
    if(typeof props.onSelect == "function"){
      const value = typeof props.getOptionValue !== "function"?option:x=>props.getOptionValue(option)
      props.onSelect(value);
    }
    setShowList(false);
  },[]);
  let [selectedOption,setSelectedOption] = useState(null)
  useEffect(()=>{
    if(Array.isArray(props.optionList) ){
      const compare = typeof props.getOptionValue !== "function"?x=>x === props.value:x=>props.getOptionValue(x) === props.value
      const foundValue = props.optionList.find(compare);
      setSelectedOption(foundValue);
    }


  },[props.value,props.optionList])
  const onBWrapperBlur = useCallback(()=>{
    //TODO: its better to put blur on drop down list and check e.relatedTarget to not contain any other drop down assets
    setShowList(false);
  },[])
  return (
    <div className="drop-down" tabIndex={0} onBlur={onBWrapperBlur}>
      <div
        className={`input size text color ${showList && "active"}`}
        onClick={() => onValueHolderClick()}
      >
      {props.value? selectedOption?.name : emptyStateText}
      </div>
      {showList && (
        <div className="list size color">
          {
            props.optionList.map((option) => {
              return (
                <div className="item size text" onClick={() => onOptionSelect(option)}>
                  {/* TODO: it's better to use some call back function like getOptionValue to get display value of option */}
                  {/* we could also support for React.children function parameter to let user customize how options must lookalike */}
                  {option.name}
                </div>
              )
            }
            )
          }
        </div>
      )}
    </div>
  );
};
