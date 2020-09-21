import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    currentPizza: {
      topping: '',
      size: '',
      vegetarian: true
    }
  }

  componentDidMount(){
    this.fetchPizzas()
  }

  fetchPizzas = ()=>{
    fetch('http://localhost:3000/pizzas')
    .then(res=>res.json())
    .then(pizzaFetch=>
      this.setState({
        pizzas: pizzaFetch
      })
    )
  }

  updatePizza = (pizza)=>{
    fetch(`http://localhost:3000/pizzas/${pizza.id}`, {
      method: 'PATCH',
      body: JSON.stringify(pizza),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(updatePizza => {
      this.setState({
        pizzas: [...this.state.pizzas].map( pizza => pizza.id === this.state.currentPizza.id ? updatePizza : pizza)
      })
    })
  }

  setCurrentPizza = (pizza)=>{
    this.setState({
      currentPizza: pizza
    })
  }

  handleInputChange = (e)=>{
    this.setState({
      currentPizza:{
      ...this.state.currentPizza,
      [e.currentTarget.name]: e.currentTarget.value
      }
    })
  }

  setPizzaVegeterian = (newVegetarian) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        vegetarian: newVegetarian
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          currentPizza = {this.state.currentPizza}
          updatePizza = {this.updatePizza}
          handleInputChange = {this.handleInputChange}
          setPizzaVegeterian={this.setPizzaVegeterian}
        />
        <PizzaList pizzas={this.state.pizzas} setCurrentPizza={this.setCurrentPizza} 
        />
      </Fragment>
    );
  }
}

export default App;
