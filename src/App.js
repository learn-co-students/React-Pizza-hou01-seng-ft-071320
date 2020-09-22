import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    selectedPizza: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/pizzas`)
    .then(resp => resp.json())
    .then(pizzas => this.setState({
      pizzas: pizzas
    }))
  }

  
  selectedPizza = (pizza) => {
    this.setState({
      selectedPizza: pizza
    })
  }

  updatePizza = (e) => {
    console.log("Hello")
  }
  
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm selectedPizza={this.state.selectedPizza} updatePizza={this.updatePizza}/>
        <PizzaList pizzas={this.state.pizzas} selectedPizza={this.selectedPizza}/>
      </Fragment>
    );
  }
}

export default App;
