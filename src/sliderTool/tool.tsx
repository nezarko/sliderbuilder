import React, { useState } from "react";
import { Box, TextField, Slider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useMyContext } from "../MyContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    margin: "3px",
    border: "2px solid #cce",
    borderRadius: "2px dotted #cee",
    width: "auto",
    height: "830px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2px",
  },
  previewBox: {
    width: "100%",
    height: "300px",
    backgroundColor: "lightgray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "100%",
    marginTop: "2px",
  },
}));

const BuilderTool = () => {
  const classes = useStyles();
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(300);
  const [bgColor, setBgColor] = useState("lightgray");
  const { state, updateWidth, updateHeight, updateBgColor } = useMyContext();

  console.log(state, "setSate");

  return (
    <div className={classes.container}>
      <Typography variant="h6">Slider Builder Tool</Typography>
      <div className={classes.inputContainer}>
        <TextField
          label="Slider Width"
          variant="outlined"
          type="number"
          value={state.width}
          onChange={(e) => updateWidth(Number(e.target.value))}
          margin="normal"
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Slider Height"
          variant="outlined"
          type="number"
          value={state.height}
          onChange={(e) => updateHeight(Number(e.target.value))}
          margin="normal"
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Slider Background Color"
          variant="outlined"
          value={state.bgColor}
          onChange={(e) => updateBgColor(e.target.value)}
          margin="normal"
        />
      </div>
      <Box
        className={classes.previewBox}
        style={{ width, height, backgroundColor: state.bgColor }}
      >
        Pre Slider Preview
      </Box>
      <Slider
        className={classes.slider}
        value={width}
        onChange={(_, newValue) => setWidth(Number(newValue))}
        min={0}
        max={500}
        step={1}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}px`}
      />
    </div>
  );
};

export default BuilderTool;
