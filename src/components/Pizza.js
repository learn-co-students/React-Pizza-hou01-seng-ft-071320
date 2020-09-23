import React from "react"

const Pizza = (props) => {
  const pizza = props.pizza

  const editPizza = () => {
    props.editPizza(pizza)
  }

  return(
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian.toString()}</td>
      <td><button onClick={editPizza}type="button" className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
