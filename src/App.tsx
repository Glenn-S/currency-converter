import React from 'react';

const App = () => {
  return (
    <div>
      {process.env.REACT_APP_API_KEY}
    </div>
  );
};

export default App;