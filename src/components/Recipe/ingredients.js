import React from 'react';

function Ingredients (props){
	return (
		<div>
          <b>Ingredientes</b>
          <div className="form-inline">
            <span>Para <input type="text" style={{'verticalAlign': 'top'}} value={props.dinersCount} onChange={props.handleDinersCountChange}/> Personas</span>
          </div>
          <div>
            {
              props.ingredients.map(ingredientPerPerson => {
                return (
                  <div key={ingredientPerPerson.name}>
                    <span>{ingredientPerPerson.name} </span>
                    <span>{ingredientPerPerson.amount} </span>
                    <span>{ingredientPerPerson.amountUnit}</span>
                  </div>
                );
              })
            }
          </div>
          <br/>
          <br/>
        </div>
    )
}

export default Ingredients