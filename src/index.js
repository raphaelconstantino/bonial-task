import React from 'react';
import ReactDOM from 'react-dom';
import OfferList from './container/OfferList';
import Detail from './container/Detail';
import Upsert from './container/Upsert';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import './thirdparty/bootstrap/bootstrap.min.css';
import './style/style.css';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={OfferList}/>
      <Route path="/detail/:offerKey" component={Detail}/>
      <Route path="/update/:offerKey" component={Upsert}/>
      <Route path="/insert" component={Upsert}/>
    </div>
  </Router>,
  document.getElementById('root')
);
