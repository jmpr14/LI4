import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenuPaciente } from './NavMenuPaciente';
import { RodapeConta } from './RodapeConta';

export class LayoutPaciente extends Component {
    static displayName = LayoutPaciente.name;

  render () {
    return (
      <div>
        <NavMenuPaciente />
        <Container>
          {this.props.children}
        </Container>
        <RodapeConta />
        </div>
    );
  }
}
