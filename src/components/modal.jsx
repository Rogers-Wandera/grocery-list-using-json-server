import React from 'react'

function Modal({value,onchange,add}) {
  return (
    <div>
        <label>Name</label>
        <input 
            type="text" 
            value={value}
            onChange={onchange}
        />
        <button onClick={add}>Add</button>
    </div>
  )
}

export default Modal