import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useMyContext } from "./MyContext";

const useStyles = makeStyles({
  sliderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    position: "relative",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "50%",
    padding: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add box shadow
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
  },
  prevButton: {
    // top: "58%",
    // left: "37%",
    // position: "relative"
    margin: "15px",
  },
  nextButton: {
    // right: "-37%",
    // top: "-53%",
    // position: "relative"
    margin: "15px",
  },
});

const SliderReview: React.FC<{ images: string[]; onClose: () => void }> = ({
  images,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const classes = useStyles();
  const { state, updateWidth, updateHeight, updateBgColor } = useMyContext();
  console.log(state, "sliderDetails");

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth={state.width}>
      <DialogTitle>Image Slider</DialogTitle>
      <DialogContent>
        <div
          className={classes.sliderContainer}
          style={{
            width: state.width,
            height: state.height,
            backgroundColor: state.bgColor,
            overflow: "hidden",
          }}
        >
          <div className={classes.imageContainer}>
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>
      </DialogContent>
      <DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            padding: "1px",
            height: "45px",
            margin: "0px",
          }}
        >
          <IconButton
            className={`${classes.navButton} ${classes.prevButton}`}
            onClick={handlePrevious}
            color="primary"
            aria-label="Previous"
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>

          <IconButton
            className={`${classes.navButton} ${classes.nextButton}`}
            onClick={handleNext}
            color="primary"
            aria-label="Next"
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    // <Dialog open={true} onClose={onClose} fullWidth={state.width}>
    //   <DialogTitle>Image Slider</DialogTitle>
    //   <DialogContent>
    //     <div className={classes.sliderContainer} >
    //       <IconButton
    //         className={`${classes.navButton} ${classes.prevButton}`}
    //         onClick={handlePrevious}
    //         color="primary"
    //         aria-label="Previous"
    //       >
    //         <ChevronLeftIcon fontSize="large" />
    //       </IconButton>
    //       <div className={classes.imageContainer}>
    //         <img
    //           src={images[currentIndex]}
    //           alt={`Image ${currentIndex + 1}`}
    //           style={{ maxWidth: "100%", maxHeight: "100%" }}
    //         />
    //       </div>
    //       <IconButton
    //         className={`${classes.navButton} ${classes.nextButton}`}
    //         onClick={handleNext}
    //         color="primary"
    //         aria-label="Next"
    //       >
    //         <ChevronRightIcon fontSize="large" />
    //       </IconButton>
    //     </div>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={onClose} color="primary">
    //       Close
    //     </Button>
    //   </DialogActions>
    // </Dialog>
  );
};

export default SliderReview;
