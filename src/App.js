import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state ={
    pizzas: [],
    newPizza:{
      topping:"",
      size:"",
      vegetarian: false
    },
    editPizza:{
      id: null,
      topping:"",
      size:"",
      vegetarian: false
    },
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas =>{
      this.setState({
        pizzas: pizzas
      })
    })
  }

  updateForm = (newPizza) =>{
    this.setState({
      ...this.state,
      newPizza:{
        id: newPizza.id,
        topping: newPizza.topping,
        size: newPizza.size,
        vegetarian: newPizza.vegetarian
      }
    })
  }

  submitNewPizza = () =>{
    //console.log(this.state)
    this.state.editPizza.id ? this.submitEditPizza() : this.createNewPizza()
  }

  editPizza = (pizza) =>{
    //console.log(pizza)
    this.setState({
      ...this.state,
      newPizza: pizza.pizza,
      editPizza: pizza.pizza
    })
  }

  updatePizzas = () =>{
    let pizzaList = this.state.pizzas.map(pizza =>{
      if(pizza.id === this.state.editPizza.id){
        pizza.topping = this.state.newPizza.topping
        pizza.size = this.state.newPizza.size
        pizza.vegetarian = this.state.newPizza.vegetarian
      }
      return pizza
    })
    this.setState({
      ...this.state,
      pizzas: pizzaList
    })
  }

  updateNewPizzas = () =>{
    let pizzaList = this.state.pizzas
    pizzaList.push(this.state.newPizza)
    this.setState({
      ...this.state,
      pizzas: pizzaList
    })
  }

  submitEditPizza = () =>{
    const patchData = {
      topping: this.state.newPizza.topping,
      size: this.state.newPizza.size,
      vegetarian: this.state.newPizza.vegetarian
    }
    fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchData)
    })
    .then(res => res.json())
    .then(pizza =>{
      this.updatePizzas()
    })
  }

  createNewPizza = () =>{
    fetch('http://localhost:3000/pizzas',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newPizza)
    })
    .then(res => res.json())
    .then(pizza =>{
      this.updateNewPizzas()
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm newPizza={this.state.newPizza} updateForm={this.updateForm} submitNewPizza={this.submitNewPizza}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
