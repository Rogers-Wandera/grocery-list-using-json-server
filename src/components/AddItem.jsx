import React from 'react'

const AddItem = ({handleChangeModal,modal}) => {
  return (
    <button onClick={handleChangeModal}>
        {modal ? "Close Model":"Add Item"}
    </button>
  )
}

export default AddItem;
