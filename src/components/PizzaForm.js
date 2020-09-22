import React, { Component } from 'react';

class PizzaForm extends Component {

  state={
      id: null,
      topping: null,
      size: "Small",
      vegetarian: this.props.newPizza.vegetarian
  }

  handleToppingChange = (topping) =>{
    //console.log(e)
    this.setState({
      topping: topping
    },
      () => this.props.updateForm(this.state)
    )
  }

  handleSizeChange = (size) =>{
    //console.log(e)
    this.setState({
      size: size
    },
      () => this.props.updateForm(this.state)
    )
  }

  handleVeggieChange = (veggie) =>{
    //console.log(e)
    if(veggie === "Vegetarian"){
      this.setState({
        vegetarian: true
      })
    }else if(veggie === "Not Vegetarian"){
        this.setState({
          vegetarian: false
        },
          () => this.props.updateForm(this.state)
        )
    }
  }

  handleSubmitClick = () =>{
    //console.log(this.state)
    if(this.state.topping){
      this.props.submitNewPizza(this.state)
    }
  }

  render(){
  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={(e) => this.handleToppingChange(e.target.value)}type="text" className="form-control" placeholder="Pizza Topping" value={
                //Pizza Topping Should Go Here
                this.props.newPizza.topping
              }/>
        </div>
        <div className="col">
          <select onChange={(e) =>this.handleSizeChange(e.target.value)} value={this.props.newPizza.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" checked={this.props.newPizza.vegetarian ? true: false} name="veggie" onChange={(e) => this.handleVeggieChange(e.target.value)}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" checked={this.props.newPizza.vegetarian ? false: true}name="veggie" onChange={(e) => this.handleVeggieChange(e.target.value)}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={this.handleSubmitClick}>Submit</button>
        </div>
      </div>

    )
  }
}

export default PizzaForm
