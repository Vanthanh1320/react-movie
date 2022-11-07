import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';
import { BrowserRouter,Route } from 'react-router-dom';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Config from './config/Config';

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Config />
        <Footer />
      </BrowserRouter>
  );
}

export default App;
