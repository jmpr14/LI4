import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenuMedico } from './NavMenuMedico';
import { RodapeConta } from './RodapeConta';

export class LayoutMedico extends Component {
    static displayName = LayoutMedico.name;

  render () {
    return (
      <div>
        <NavMenuMedico />
        <Container>
          {this.props.children}
        </Container>
        <RodapeConta />
        </div>
    );
  }
}
