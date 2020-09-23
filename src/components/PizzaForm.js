import React from "react"

class PizzaForm extends React.Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     id: this.props.selectedPizza.id,
  //     topping: this.props.selectedPizza.topping,
  //     size: this.props.selectedPizza.size,
  //     vegetarian: this.props.selectedPizza.vegetarian
  //   }
  // }

  state = {
    id: '',
    topping: '',
    size: '',
    vegetarian: ''
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.selectedPizza !== this.props.selectedPizza) {
      this.setPizza()
    }
  }
  
  setPizza = () => {
    if (this.props.selectedPizza !== "") {
      this.setState ({
        id: this.props.selectedPizza.id,
        topping: this.props.selectedPizza.topping,
        size: this.props.selectedPizza.size,
        vegetarian: this.props.selectedPizza.vegetarian
      })
    } else {
      this.setState ({
        id: '',
        topping: '',
        size: '',
        vegetarian: ''
      })
    }
  }

  showMePizza = (e) => {
    let father = e.target.parentElement.parentElement
    let zza = {}
    zza.id = this.state.id
    zza.topping = father.childNodes[0].firstChild.value
    zza.size = father.childNodes[1].firstChild.value
    zza.vegetarian = father.childNodes[2].childNodes[0].firstChild.checked

    this.props.patchPizza(zza)
  }

  handlePizzaTopping = (e) => {
    let newPizzaTopping = e.target.value

    this.setState({ topping: newPizzaTopping })
  }

  handlePizzaSize = (e) => {
    let newPizzaSize = e.target.value

    this.setState({ size: newPizzaSize })
  }


  handleVegetables = (e) => {
    let value = e.target.parentElement.firstChild.value

    if (value === "Vegetarian") {
      this.setState({ vegetarian: true })
    } else if (value === "Not Vegetarian") {
      this.setState({ vegetarian: false })
    }
    
  }

  render() {
    return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={e => this.handlePizzaTopping(e)} type="text" className="form-control" placeholder="Pizza Topping" value={this.state.topping}/>
        </div>
        <div className="col">
          <select onChange={e => this.handlePizzaSize(e)} value={this.state.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onClick={ e => this.handleVegetables(e) } className="form-check-input" type="radio" value="Vegetarian" checked={this.state.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onClick={ e => this.handleVegetables(e) } className="form-check-input" type="radio" value="Not Vegetarian" checked={!this.state.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={e => this.showMePizza(e)}>Submit</button>
        </div>
      </div>
    )
  }

}

export default PizzaForm

