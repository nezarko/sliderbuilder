import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function useMyContext() {
  return useContext(MyContext);
}

export function MyContextProvider({ children }) {
  const [state, setState] = useState({
    // Your initial context values here
    width: 300,
    height: 300,
    bgColor: "pink",
  });

  const updateWidth = (width) => {
    setState((prevState) => ({
      ...prevState,
      width: width,
    }));
  };

  const updateHeight = (height) => {
    setState((prevState) => ({
      ...prevState,
      height: height,
    }));
  };
  const updateBgColor = (bgColor) => {
    setState((prevState) => ({
      ...prevState,
      bgColor: bgColor,
    }));
  };

  return (
    <MyContext.Provider
      value={{ state, updateWidth, updateHeight, updateBgColor }}
    >
      {children}
    </MyContext.Provider>
  );
}
