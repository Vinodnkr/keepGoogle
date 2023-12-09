import Register from "./components/signUp/Register.js";
import Home from "./components/Home/Home.js";
import LoginForm from "./components/LoginForm/Index.js";
import Category from "./components/category/Category.js";
import CategoryItem from "./components/category/CategoryItem.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from './components/NotFound/index.js';
import ls from "local-storage";


import "./style.css";

function App() {
  const nullNote = { id: 9999999, title: "Add Title", note: "Add Notes", category: "Appointment" };

  const storedNotes = JSON.parse(ls.get("notes")) || [nullNote];
 

 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home note={storedNotes}  />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route
          path="/category/:id"
          element={<CategoryItem notes={storedNotes}  />}
        />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
