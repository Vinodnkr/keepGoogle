import React from "react";
import createCard from "./minors/CreateCard";
import notes from "../notes";

function Notes() {
  return <div className="row">{notes.map(createCard)}</div>;
}

export default Notes;
