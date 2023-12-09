import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

function CreateCard({ notes, setNotes, content, deletenote }) {
  if (content.note !== "NULL") {
    return (
      <Card
        del={deletenote}
        id={content.id}
        key={content.id}
        title={content.title}
        content={content.note}
        categoryValue={content.category}
        notes={notes}
        setNotes={setNotes}
      />
    );
  }
}

// const categories = [
//   {
//     id: 1,
//     name: "Arts",
//   },
//   {
//     id: 2,
//     name: "Business",
//   },
//   {
//     id: 3,
//     name: "Computers",
//   },
//   {
//     id: 4,
//     name: "Games",
//   },
//   {
//     id: 5,
//     name: "Health",
//   },
//   {
//     id: 6,
//     name: "Home",
//   },
//   {
//     id: 7,
//     name: "Kids and Teens",
//   },
//   {
//     id: 8,
//     name: "News",
//   },
//   {
//     id: 9,
//     name: "Recreation",
//   },
//   {
//     id: 10,
//     name: "Reference",
//   },
//   {
//     id: 11,
//     name: "Regional",
//   },
//   {
//     id: 12,
//     name: "Science",
//   },
//   {
//     id: 13,
//     name: "Shopping",
//   },
//   {
//     id: 14,
//     name: "Society",
//   },
//   {
//     id: 15,
//     name: "Sports",
//   },
//   {
//     id: 16,
//     name: "World",
//   },
// ];


function Card(props) {
  console.log("Card props", props);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(props.content);
  const [editTitleMode, setEditTitleMode] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title);
  const [category, setCategory] = useState("");

  const categories = JSON.parse(localStorage.getItem("categories"));

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function toggleEditTitleMode() {
    setEditTitleMode(!editTitleMode);
  }

  function saveEdit() {
    console.log("Save edit clicked", props.id, editContent, editTitle);

    const updatedNotes = props.notes.map((note) => {
      if (note.id === props.id) {
        return { ...note, title: editTitle, note: editContent };
      }
      return note;
    });

    props.setNotes(updatedNotes);

    // Add your logic to save the edited content, e.g., send it to localStorage
    setEditMode(false);
    setEditTitleMode(false);
  }

  function cancelEdit() {
    console.log("Cancel edit clicked", props.id, props.title, props.content);
    setEditMode(false);
    setEditTitleMode(false);
  }

  function taskDelete() {
    props.del(props.id);
  }

  const handleChange = (event) => {
    setCategory(event.target.value);

    const updatedData = props.notes.map((note) => {
      if (note.id === props.id) {
        return { ...note, category: event.target.value };
      }
      return note;
    });
    console.log("upd", updatedData);
    props.setNotes(updatedData);
  };

  return (
    <div>
      <div className="col s12 m3">
        <div className="card white lighten">
          <div className="card-content black-text">
            {editTitleMode ? (
              <textarea
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span className="card-title" onClick={toggleEditTitleMode}>
                {props.title}
              </span>
            )}
            {editMode ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            ) : (
              <span className="text-justify" onClick={toggleEditMode}>
                {props.content}
              </span>
              
            )}
          </div>
          <div className="card-action blue-text">
            {editMode ? (
              <div>
                <button value={editContent} onClick={saveEdit}>
                  Save
                </button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <a
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginRight: "5px",
                }}
                className="blue-text text-lighten-3"
                href="#"
              >
                <i
                  onClick={taskDelete}
                  className="small material-icons tooltipped"
                  data-position="top"
                  data-tooltip="Delete"
                >
                  delete
                </i>
                <i
                  style={{ marginRight: "10px", fontSize: "1.8em" }}
                  className="small material-icons tooltipped"
                  data-position="top"
                  data-tooltip="Copy To Clipboard"
                  onClick={() => {
                    toggleEditMode();
                    toggleEditTitleMode();
                  }}
                >
                  edit
                </i>
              </a>
            )}
          </div>
          <hr />
          <div style={{ marginTop: "-5px" }}>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 250, width: "90%" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Select Folder
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props.categoryValue || category}
                onChange={handleChange}
                label="Select Category"
                fullWidth
              >
                {categories?.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCard;
