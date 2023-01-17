import './App.css';
import Header from "./files/header"
import Footer from "./files/footer"
import Main from "./files/main"
import {HashRouter} from 'react-router-dom';
function App() {
  return (
    <HashRouter>
      <Header/>
      <Main/>
      <Footer/>
    </HashRouter>
  );
}

export default App;
