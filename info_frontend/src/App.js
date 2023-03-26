import React from 'react';
import { Provider } from 'react-redux';
import Main from "./views/Main";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
//scss
import "./assets/scss/socialv.scss"
//import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/v/app/headerStyle/header';
import Footer from './components/v/app/footerStyle/footer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="wrapper">
              <Header />
              <div id="content-page" className="content-page">
                <Main />
              </div>
            </div>
            <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;