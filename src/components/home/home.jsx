import React from 'react';
import './home.scss';

const Aside = require('../asideChat/asideChat');
const NavChat = require('../navChat/navChat');
const MainChat = require('../mainChat/mainChat');
const RightAside = require('../rightAsideChat/rightAsideChat');

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className='row home'>
        <Aside
          getUsers={ this.props.getUsers }
        />
        <NavChat />
        <MainChat />
        <RightAside />
      </div>
    );
  }
}

module.exports = Menu;
