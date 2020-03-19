import React, { Component } from 'react';

import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            age: null,
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let age = this.state.age;
        if (!Number(age)) {
            alert("Your age must be a number");
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    myFunction = () => {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <h1> Hello {this.state.username} {this.state.age}</h1>
                <p>Enter your name:</p>
                <input
                    type="password"
                    name='username'
                    onChange={this.myChangeHandler}
                />
                <p>Enter your age:</p>
                <input
                    type='text'
                    name='age'
                    onChange={this.myChangeHandler}
                />
                <br />
                <br />
                <input type='submit' />
            </form>

        );
  }
}
