import React from "react"

const isVegeterian = (props) => {
  let vStatus = ""

  if (props.pizza.vegetarian === true){
    vStatus = "Yes"
  } else {
    vStatus = "No"
  }
  return vStatus
}

const Pizza = (props) => {

  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{isVegeterian(props)}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.selectedPizza(props.pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
