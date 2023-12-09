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
  Link,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer'


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

  const data = JSON.parse(localStorage.getItem("categories")) ;

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
    <Header />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Folder Name</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter the folder name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Type Here"
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
        <Typography variant="h3">All Folders</Typography>
        <Link variant="h4" href="/home"><ArrowBackIcon/>Back</Link>

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
                  fontSize: "22px",
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
                fontSize: "22px",
                marginBottom: "90px",
                
              }}
              onClick={() => setOpen(true)}
            >
              + Add Folder
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Category;
