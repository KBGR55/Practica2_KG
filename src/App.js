import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import PresentarActividad, { PresentarActividades} from './fragment/PresentarActividad';
import Principal from './fragment/Principal';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/PresentarActividades' element={<PresentarActividades/>}/>
        <Route path='/' element={<Principal/>}/>
      </Routes>
      </div>
  );
}

export default App;