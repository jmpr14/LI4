import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenuAdmin } from './NavMenuAdmin';
import { RodapeConta } from './RodapeConta';

export class LayoutAdmin extends Component {
    static displayName = LayoutAdmin.name;

  render () {
    return (
      <div>
        <NavMenuAdmin />
        <Container>
          {this.props.children}
        </Container>
        <RodapeConta />
        </div>
    );
  }
}
