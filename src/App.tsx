import React, { useState } from "react";
import "./App.css";
import BuilderTool from "./sliderTool/tool";
import Container from "./sliderContainer/container";
import { MyContextProvider } from "./MyContext";

function App() {
  const handleImageUpload = (image: string) => {
    console.log("Uploaded image:", image);
  };
  return (
    <div className="App">
      <MyContextProvider>
        <BuilderTool />
        <Container onImageUpload={handleImageUpload} />
      </MyContextProvider>
    </div>
  );
}

export default App;
