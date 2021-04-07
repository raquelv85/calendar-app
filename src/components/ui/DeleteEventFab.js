import React from "react"


export const DeleteEventFab = (props) => {
  return ( 
    <button className="btn btn-danger fab-danger" onClick={() => props.action()}>
      <i className="fas fa-trash"></i>
      <span>Borrar evento</span>
    </button>
   );
}