import React from "react"

const PizzaForm = (props) => {

  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" value={
                props.selectedPizza.topping
              } 
              onChange={e=>{props.editForm(e.target.value, 'topping')}}/>
        </div>
        <div className="col">
          <select value={props.selectedPizza.size} className="form-control" onChange={e=>{props.editForm(e.target.value, 'size')}}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>]
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check" onChange={e => {
            props.editForm(e.target.value==='Vegetarian'? true: false, 'vegetarian')
          }}>
            <input className="form-check-input" type="radio" value="Vegetarian" checked={props.selectedPizza.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check" onChange={e => {
            props.editForm(e.target.value==='Not Vegetarian'? false: true, 'vegetarian')
          }}>
            <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!props.selectedPizza.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={() => props.updatePizza(props.selectedPizza)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
