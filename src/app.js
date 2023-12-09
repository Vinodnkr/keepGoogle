import React, { useState } from "react";
import Register from "./components/signUp/Register";
import Home from "./components/home/Home";
import LoginForm from "./components/LoginForm/Index";
import Category from "./components/category/Category.js";
import CategoryItem from "./components/category/CategoryItem.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from './components/NotFound';

import ls from "local-storage";
import "./style.css";

function App() {
  const nullNote = { id: 9999999, title: "NULL", note: "NULL" };

  const storedNotes = JSON.parse(ls.get("notes")) || [nullNote];

  const [notes, setNotes] = useState(storedNotes);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route
          path="/category/:id"
          element={<CategoryItem notes={notes} setNotes={setNotes} />}
        />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
