import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  state={
    pizzas: [],
    selectedPizza: {
      id: null,
      vegetarian: '',
      topping: '',
      size: ''
    },
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res =>  res.json())
    .then(data => { // check data
      this.setState({
        pizzas: data,
      })
    })
  }

  editPizza=(pizzaID)=>{
   const selectedPizza=this.state.pizzas.find(ele=>ele.id === pizzaID)
   this.setState({
     selectedPizza: selectedPizza,
   })
  }

  editForm = (value, type) => {
    console.log(value,type)
    this.setState({
      selectedPizza: {
        ...this.state.selectedPizza,
        [type]: value
      }
    })
  }
  updatePizza=(newPizza)=>{
    const pizzaFound = this.state.pizzas.find(p => p.id === newPizza.id)
    // console.log({newPizza, pizzaFound})

      if (pizzaFound) {
        this.patchPizza(newPizza)
      } else {
        this.createPizza(newPizza)
    }
  }

  patchPizza=(newPizza)=>{
    console.log("patch")
    fetch(`http://localhost:3000/pizzas/${newPizza.id}`,
          { method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'},
            body: JSON.stringify(newPizza
            //   {
            //   // id: newPizza.id,
            //   // topping: newPizza.topping,
            //   // size: newPizza.size,
            //   // vegetarian: newPizza.vegetarian
            // }
            )
          })
          .then(res => res.json())
          .then(newPizzaobj=>{
            this.setState({
              pizzas: this.state.pizzas.map(p => {
                if (p.id === newPizzaobj.id) {
                  return newPizzaobj
                }
                return p
              })
            })
          })
  }
  createPizza=(newPizza)=>{
    console.log("create")
    fetch('http://localhost:3000/pizzas',
        { method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(
            // newPizza
            {
            topping: newPizza.topping,
            size: newPizza.size,
            vegetarian: newPizza.vegetarian
          }
          )
        })
        .then(res => res.json())
        .then(newPizzaobj=>{
          this.setState({
            pizzas: [...this.state.pizzas,newPizzaobj]
        })
        })
  }
  
  
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm editForm={this.editForm} selectedPizza={this.state.selectedPizza} updatePizza={this.updatePizza}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
