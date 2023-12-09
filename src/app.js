import React, { useState } from "react";
import Register from "./components/signUp/Register";
import Home from "./components/home/Home";
import LoginForm from "./components/LoginForm/Index";
import Category from "./components/category/Category.js";
import CategoryItem from "./components/category/CategoryItem.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js'
import ls from "local-storage";
import "./style.css";

function App() {
  const nullNote = { id: 9999999, title: "NULL", note: "NULL" };

  const storedNotes = JSON.parse(ls.get("notes")) || [nullNote];

  const [notes, setNotes] = useState(storedNotes);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route
          path="/category/:id"
          element={<CategoryItem notes={notes} setNotes={setNotes} />}
        />
        <Route path="*" element={<><Header /><h1>Not Found</h1> <Footer /></>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
