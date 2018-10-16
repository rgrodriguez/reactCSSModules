import React, { Component } from 'react';
import './App.css';
import Person from './Person/person';

class App extends Component {
  state = {
    persons: [
      { id: 'wer234', name: 'John', age: 37 },
      { id: 'ryr888', name: 'Peter', age: 88 },
      { id: 'bon959', name: 'Josephine', age: 56 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

/*
  switchNameHandler = (newName) => {
    //console.log('I was clicked');
    // Don't do this: this.state.persons[0].name = "Omar";
    this.setState({
      persons: [
        { name: newName, age: 24 },
        { name: 'Peter', age: 88 },
        { name: 'Josephine', age: 56 }
      ]
    })
  }
*/

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons} );
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }


  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };


    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
        {this.state.persons.map((person, index) => {
          return <Person
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)}/>
        })}
      </div>
      );

      style.backgroundColor = 'red';
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
        <div className="App">
          <h1>Hey baby, I'm a React App!</h1>
          <p className={classes.join(' ')}>This is working</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
    );
  }
}

export default App;
