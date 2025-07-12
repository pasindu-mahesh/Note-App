import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '/routes/Home/home.jsx';
import About from '/routes/About/about.jsx';
import Header from './components/Header.jsx';

function App() {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        Footer
      </Router>
    </>
  )
}

export default App
