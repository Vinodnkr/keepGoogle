import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ls from "local-storage";
import NewNote from "../NewNote";
import Header from "../Header/Header";
import CreateCard from "../minors/CreateCard";
import Footer from "../Footer/Footer";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Home = ({ note }) => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(note);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [categories] = useState(
    JSON.parse(localStorage.getItem("categories")) || [
      { id: 1, name: "Appointment" },
      { id: 2, name: "Shopping" },
      { id: 3, name: "Meeting" },
    ]
  );
  const [view, setView] = useState("list"); // Default to list view

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    const loginStatus = localStorage.getItem("LoginStatus");
    if (loginStatus === "false") {
      console.log("Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    ls.set("notes", JSON.stringify(notes));
    // Filter notes based on search input value
    setFilteredNotes(notes);
  }, [notes]);

  useEffect(() => {
    // Update the title based on the number of notes
    document.title = `My Notes (${notes.length})`;
  }, [notes]);

  const addNote = (title, content) => {
    const newId = Math.round(Math.random() * 100);
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: newId, title, note: content },
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setFilteredNotes(
      notes.filter((note) =>
        note.note.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  };

  const toggleView = () => {
    setView((prevView) => (prevView === "list" ? "grid" : "list"));
  };

  return (
    <>
      <Header />
      <NewNote add={addNote} />
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <TextField
          label="Search notes..."
          variant="outlined"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <br />
        <Button
          onClick={toggleView}
          style={{ margin: "10px " }}
          variant="contained"
        >
          Toggle View
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {view === "list" ? (
          <List style={{ textAlign: "center" }}>
            {filteredNotes.map((note) => (
              <ListItem key={note.id} style={{ textAlign: "center" , wordWrap: "break-word"}}>
                
                <CreateCard
                style={{ textAlign: "center" , wordWrap: "break-word"}}
                  notes={notes}
                  setNotes={setNotes}
                  content={note}
                  deletenote={deleteNote}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Grid container spacing={2}>
            {filteredNotes.map((note) => (
              <Grid item key={note.id} xs={12} sm={6} md={4} lg={3}>
                <CreateCard
                  notes={notes}
                  setNotes={setNotes}
                  content={note}
                  deletenote={deleteNote}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
