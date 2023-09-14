import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogContentText,
  TextField, // Import TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import SliderReview from "../sliderReview";

interface ContainerProps {
  onImageUpload: (image: string) => void;
}

const useStyles = makeStyles({
  container: {
    border: "1px dashed #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px",
    cursor: "pointer",
    width: "450px", // Set the fixed width
    minHeight: "600px", // Remove the fixed height
    position: "relative", // Add position for relative positioning of the text field
  },
  imageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
    position: "relative",
  },
  uploadedImage: {
    maxWidth: "80%",
    maxHeight: "100%",
  },
  previousImages: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  smallImage: {
    width: "100px",
    height: "100px",
    margin: "5px",
  },
  buttomicons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "18px",
  },
  iconButtons: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  EditButtons: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "lightgray",
  },
  addImageButton: {
    zIndex: 2,
    position: "relative",
  },
  textFieldModal: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "10px",
    cursor: "grab",
  },
});

const Container: React.FC<ContainerProps> = ({ onImageUpload }) => {
  const classes = useStyles();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previousImages, setPreviousImages] = useState<string[]>([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [reviewImageIndex, setReviewImageIndex] = useState<number | null>(null);
  const [review, setReview] = useState(false);
  const [isTextEditModalOpen, setTextEditModalOpen] = useState(false);
  const [textFieldPosition, setTextFieldPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleDeleteConfirmation = () => {
    if (reviewImageIndex && reviewImageIndex !== null) {
      const updatedImages = [...previousImages];
      updatedImages.splice(reviewImageIndex, 1); // Remove the current image
      setPreviousImages(updatedImages);
      setReviewImageIndex(null);
      setSelectedImage(
        updatedImages[reviewImageIndex - 1] || updatedImages[0] || null
      ); // Select the previous image or the first one
      setDeleteConfirmationOpen(false);
    }
  };

  const handleClearAll = () => {
    // Clear all images and reset the state
    setPreviousImages([]);
    setReviewImageIndex(null);
    setSelectedImage(null);
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    if (storedImages) {
      setPreviousImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(previousImages));
  }, [previousImages]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedImage(previousImages[previousImages.length - 1] || null);
  };

  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = e.target?.result as string;
        setSelectedImage(image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      setPreviousImages((prevImages) => [...prevImages, selectedImage]);
      onImageUpload(selectedImage);
      handleCloseDialog();
    }
  };

  const handleReviewImageClick = (index: number) => {
    setSelectedImage(previousImages[index]);
    setReviewImageIndex(index);
  };

  const handleReviewButtonClick = () => {
    if (previousImages.length > 0) {
      setReviewImageIndex(0);
      setDialogOpen(false);
      setReviewImageIndex(0);
    }
  };

  const handleTextEditModalOpen = () => {
    setTextEditModalOpen(true);
  };

  const handleTextEditModalClose = () => {
    setTextEditModalOpen(false);
  };

  const handleTextFieldDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", "");
  };

  const handleSliderDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const textFieldLeft = e.clientX;
    const textFieldTop = e.clientY;
    setTextFieldPosition({ left: textFieldLeft, top: textFieldTop });
  };

  return (
    <div className={classes.container}>
      {reviewImageIndex !== null ? (
        <SliderReview
          images={previousImages}
          onClose={() => setReviewImageIndex(null)}
        />
      ) : null}
      <div className={classes.imageWrapper}>
        {selectedImage && (
          <div>
            <IconButton
              className={classes.EditButtons}
              color="primary"
              size="large"
              aria-label="Edit Slider"
              onClick={handleTextEditModalOpen}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>

            <IconButton
              className={classes.iconButtons}
              color="warning"
              aria-label="Delete"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteConfirmationOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>

            <img
              src={selectedImage}
              alt="Selected"
              className={classes.uploadedImage}
              onDragStart={handleTextFieldDragStart}
              draggable={true}
              onDragEnd={handleSliderDrop}
            />
          </div>
        )}
        {selectedImage ? (
          <IconButton
            color="primary"
            size="large"
            aria-label="Upload Image"
            className={classes.addImageButton}
            onClick={handleOpenDialog}
          >
            <AddCircleOutlineIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton
            color="primary"
            size="large"
            aria-label="Upload Image"
            style={{ marginBottom: "10px" }}
            onClick={handleOpenDialog}
          >
            <AddCircleOutlineIcon fontSize="inherit" />
          </IconButton>
        )}
        <div className={classes.previousImages}>
          {previousImages.map((image, index) => (
            <img
              src={image}
              alt={`Previous ${index + 1}`}
              key={index}
              className={classes.smallImage}
              onClick={() => handleReviewImageClick(index)}
            />
          ))}
        </div>
      </div>
      <div
        className={classes.buttomicons}
        onDrop={handleSliderDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {previousImages.length > 0 && (
          <IconButton
            className={classes.iconButtons}
            color="primary"
            aria-label="Review"
            onClick={handleReviewButtonClick}
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        )}
        {previousImages.length > 0 && (
          <IconButton
            className={classes.iconButtons}
            color="error"
            aria-label="Clear All"
            onClick={handleClearAll}
          >
            <ClearIcon fontSize="inherit" />
          </IconButton>
        )}
      </div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-input"
            type="file"
            onChange={handleImageInputChange}
          />
          <label htmlFor="image-input">
            <Button
              variant="outlined"
              component="span"
              color="primary"
              fullWidth
            >
              Choose Image
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleImageUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        {/* ... (Delete confirmation dialog code) */}
      </Dialog>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle color="primary">Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isTextEditModalOpen}
        onClose={handleTextEditModalClose}
        maxWidth="xs"
      >
        <DialogTitle>Edit Text</DialogTitle>
        <DialogContent>
          <TextField
            label="Text"
            variant="outlined"
            multiline
            fullWidth
            // You can add value and onChange for handling the text field's value
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTextEditModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTextEditModalClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Draggable text field */}
      {isTextEditModalOpen && (
        <div
          className={classes.textFieldModal}
          style={{ top: textFieldPosition.top, left: textFieldPosition.left }}
          draggable={true}
          onDragStart={handleTextFieldDragStart}
        >
          <TextField label="Drag me" variant="outlined" multiline fullWidth />
        </div>
      )}
    </div>
  );
};

export default Container;
