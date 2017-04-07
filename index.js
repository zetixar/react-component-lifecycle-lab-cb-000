import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('main'));

require('./test/index-test.js'); // Leave this in!
