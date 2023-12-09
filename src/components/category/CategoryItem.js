import {
  Container,
  //FormControl,
  Grid,
  Link,
  //InputLabel,
  //Select,
  Typography,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

const CategoryItem = ({ notes }) => {
  const { id } = useParams();

  const data = JSON.parse(localStorage.getItem("categories")) || [];

  const [categories, setCategories] = useState(data);

  const filteredNotes =  notes.filter((note) => {
    // Assuming the 'category' property in each note matches the 'name' in categories
    return (
      note.category === categories.find((cat) => cat.id === parseInt(id))?.name
    );
  }) ;
  console.log(filteredNotes)

  return (
    <>
    <Header />
      <Container>
        <h4>
          Category: {categories.find((cat) => cat.id === parseInt(id))?.name}
        </h4>
        <Link variant="h4" href="/category"><ArrowBackIcon/>Back</Link>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {filteredNotes.map((note) => (
            <Grid item key={note.id} xs={12} sm={6} md={4}>
              <div className="card white lighten">
                <div className="card-content black-text">
                  <span className="card-title">{note.title}</span>
                  <span className="card-title">{note.note}</span>
                </div>

                <hr />

                <div className="card-content black-text">
                  <Typography>Category: {note.category}</Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    <Footer />
    </>
  );
};

export default CategoryItem;