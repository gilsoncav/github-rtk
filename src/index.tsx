import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from 'app/store';
import { Provider } from 'react-redux';

const render = () => {
  // importing dynamically and asynchronally as the module.hot.accept triggers
  // the render callback that we setted bellow
  const App = require('./app/App').default;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

render();

// we set a async trigger to call the render() callback using
// webpack's Hot Module Replacement
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('app/App', render);
}
