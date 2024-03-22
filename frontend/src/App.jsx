import { Routes,Route } from "react-router-dom";
import Home from './pages/Home';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import CreateBook from './pages/CreateBook'
import DeleteBook from './pages/DeleteBook'
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
    </Routes>
    <Footer/>
    </>
  );
};

export default App;