import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '/routes/Home/home.jsx';
import About from '/routes/About/about.jsx';
import AddNote from '/routes/Home/addnote.jsx';
import UpdateNote from '/routes/Home/note.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/note/:id" element={<UpdateNote />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
