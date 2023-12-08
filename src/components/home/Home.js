import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ls from "local-storage";
import NewNote from "../NewNote";
import Header from "../Header";
import CreateCard from "../minors/CreateCard";
import Footer from "../Footer";

const Home = () => {
  const nullNote = { id: 9999999, title: "NULL", note: "NULL" };
  const storedNotes = JSON.parse(ls.get("notes")) || [nullNote];
  const navigate = useNavigate();
  const [notes, setNotes] = useState(storedNotes);

  useEffect(() => {
    const data = localStorage.getItem("LoginStatus");
    console.log("Data", data);
    if (data == "false") {
      console.log("gaurav");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    ls.set(
      "notes",
      JSON.stringify(notes.filter((note) => note.id !== 9999999))
    );
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

  const saveNote = (id, content) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, note: content } : note
      )
    );
  };

  return (
    <>
      <Header />
      <NewNote add={addNote} />
      <div className="row">
        {notes.map((note) => (
          <CreateCard
            key={note.id}
            notes={notes}
            setNotes={setNotes}
            content={note}
            deletenote={deleteNote}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
