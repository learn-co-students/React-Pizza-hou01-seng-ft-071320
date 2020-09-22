import React from "react"

const Pizza = (props) => {
  // console.log({pizza})
  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian ? "Yes" : "No"}</td>
      <td><button type="button" className="btn btn-primary" onClick={(e)=>props.editPizza(props.pizza.id)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
