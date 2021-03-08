import React from 'react';

function Steps(props){
  return <div>
            <b>Pasos</b>
            <div>
              {
                props.steps.map(step => {
                  return (
                    <div key={step}>
                      <div>{step}</div>
                    </div>
                  );
                })
              }
            </div>
            <br/>
          </div>
}

export default Steps