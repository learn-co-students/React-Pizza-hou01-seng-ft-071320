import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzaList: [],
    selectedPizza: {}
  }

  componentDidMount = () => {
    this.getPizzas()
  }

  componentDidUpdate = () => {
   this.getPizzas()
  }

  getPizzas = () => {
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => {
      this.assignPizzas(pizzas)
    })
  }

  patchPizza = (zza) => {

    let pizzaToPatch = {
      "topping": zza.topping,
      "size": zza.size,
      "vegetarian": zza.vegetarian
    }

    fetch(`http://localhost:3000/pizzas/${zza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pizzaToPatch)
    })
    .then(res => res.json())
    .then(this.clearPizza())
  }

  editPizza = (zza) => {
    this.setState({ selectedPizza: zza })
  }

  assignPizzas = (zzas) => {
    this.setState({ pizzaList: zzas })
  }

  clearPizza = () => {
    this.setState( { selectedPizza: '' })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm selectedPizza={this.state.selectedPizza} patchPizza={this.patchPizza}/>
        <PizzaList pizzas={this.state.pizzaList} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
