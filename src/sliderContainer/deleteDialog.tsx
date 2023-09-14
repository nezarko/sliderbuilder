import { IconButton, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {  AddCircleOutline as AddCircleOutlineIcon,
    Edit as EditIcon,
    Delete as DeleteIcon, } from "@mui/icons-material";
    import { makeStyles } from '@mui/styles';


    interface ContainerProps {
        onImageUpload: (image: string) => void;
      }
    const useStyles: any = makeStyles({
        container: {
            border: "1px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
            cursor: "pointer",
            width: "300px", // Set the fixed width
            height: "auto", // Remove the fixed height
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
            maxWidth: "100%",
            maxHeight: "100%",
          },
          previousImages: {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "10px",
          },
          smallImage: {
            width: "50px", // Adjust the size of the small images as needed
            height: "50px",
            margin: "5px",
          },
          iconButtons: {
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1,
          },
        confirmationDialog: {
          textAlign: "center",
        },
        confirmButton: {
          backgroundColor: "#ff6347", // Use a red color for the confirm button
          color: "#fff", // White text color
          "&:hover": {
            backgroundColor: "#ff0000", // Change color on hover if needed
          },
        },
      });
      
      const DeleteDialog: React.FC<ContainerProps> = ({onImageUpload}) => {
        const classes = useStyles();
        const [isDialogOpen, setDialogOpen] = useState(false);
        const [selectedImage, setSelectedImage] = useState<string | null>(null);
        const [previousImages, setPreviousImages] = useState<string[]>([]);
        const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
      
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
      
        const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      
        const handleDeleteImage = () => {
          setDeleteConfirmationOpen(false);
          if (selectedImage) {
            const index = previousImages.indexOf(selectedImage);
            if (index !== -1) {
              previousImages.splice(index, 1);
              setPreviousImages([...previousImages]);
            }
            setSelectedImage(null);
          }
        };
      
        return (
          <div className={classes.container} onClick={handleOpenDialog}>
            <div className={classes.imageWrapper}>
              {selectedImage && (
                <div>
                  <IconButton
                    className={classes.iconButtons}
                    aria-label="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit action here
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className={classes.iconButtons}
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
                  />
                </div>
              )}
              {/* ... (other code) */}
            </div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
              {/* ... (other code) */}
            </Dialog>
      
            <Dialog
              open={deleteConfirmationOpen}
              onClose={() => setDeleteConfirmationOpen(false)}
            >
              <DialogTitle>Delete Image</DialogTitle>
              <DialogContent className={classes.confirmationDialog}>
                <Typography variant="body1">
                  Are you sure you want to delete this image?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setDeleteConfirmationOpen(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteImage}
                  color="primary"
                  className={classes.confirmButton}
                >
                  Confirm Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      };

export default DeleteDialog
