import React from 'react';
import Router from './Router';
import {Header} from './components/Header/index';

const App = () => {
  return (
    <>
      <Header />
      <main className="main">  
        <Router /> 
      </main>
    </>
  );
}

export default App;
