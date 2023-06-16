// import './App.css';
// import AppContainer from './components/AppContainer';

// function App() {

//   return (
//     <div className="App">
//       <AppContainer />
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppContainer from './components/AppContainer';
import Header from './components/Header';

function App() {

  return (
    <div className="App">
      <>
        <Header />
        <div className="app-container d-flex">
          <Router>
            <AppContainer />
          </Router>
        </div>
      </>
    </div>
  );
}

export default App;
