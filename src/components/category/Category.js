import {
  Typography,
  Grid,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Category = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [textValue, setTextValue] = React.useState("");

  const data = JSON.parse(localStorage.getItem("categories")) || [{
        id: 1,
        name: "Arts",
      },
      {
        id: 2,
        name: "Business",
      },
      {
        id: 3,
        name: "Computers",
      },];

  const [categories, setCategories] = useState(data);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, []);

  const handleClick = (id) => {
    navigate(`/category/${id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    // push the code in categories
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const updatedData = [...categories, { id: randomId, name: textValue }];

    localStorage.removeItem("categories");
    localStorage.setItem("categories", JSON.stringify(updatedData));
    setCategories(updatedData);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter the folder name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="folder name"
            type="text"
            fullWidth
            variant="standard"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>

      <Container sx={{ mt: "35px" }}>
        <Typography variant="h4">All Categories</Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {categories.map((item) => (
            <Grid item key={item} xs={6} sm={6} md={4} lg={3}>
              <Box
                style={{
                  backgroundColor: getRandomColor(),
                  padding: "20px",
                  borderRadius: "8px",
                  color: "white", // text color
                  cursor: "pointer",
                }}
                onClick={() => handleClick(item.id)}
              >
                {item.name}
              </Box>
            </Grid>
          ))}

          <Grid item xs={6} sm={6} md={4} lg={3}>
            <Box
              style={{
                backgroundColor: getRandomColor(),
                padding: "20px",
                borderRadius: "8px",
                color: "white", // text color
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => setOpen(true)}
            >
              +
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Category;
