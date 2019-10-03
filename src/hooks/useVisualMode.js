import React, {useState} from "react"

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);
  const transition = (newMode, replace = false) => {
    if (replace && history.length > 0){
      setHistory([...history])
    } else {
      setHistory([...history, mode])
    }
    setMode(newMode);
  }
  const back = () => {
    if (history.length < 1) return
    setMode(history.pop());
  }
  return {mode, transition, back}
};
