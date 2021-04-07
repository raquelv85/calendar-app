import React from "react"


export const AddNewFab = (props) => {
  return ( 
    <button className="btn btn-primary fab" onClick={() => props.action()}>
      <i className="fas fa-plus"></i>
    </button>
   );
}