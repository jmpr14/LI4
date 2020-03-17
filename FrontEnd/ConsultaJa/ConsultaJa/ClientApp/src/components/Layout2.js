import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu2 } from './NavMenu2';

export class Layout2 extends Component {
  static displayName = Layout2.name;

  render () {
    return (
      <div>
        <NavMenu2 />
        <Container>
          {this.props.children}
        </Container>
        </div>
    );
  }
}
