import './App.css';
import { ThemeProvider } from '@mui/material';

import Navbar from './components/Navbar';
import theme from './themes/theme';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default App;
