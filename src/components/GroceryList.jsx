import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'


const GroceryList = ({item,handleChange,handleDelete,loading}) => {
  return (
    <>
        {
            loading ? <p>Loading data.. please wait</p> :
            <ul>
            {
                item.map((grocery) =>{
                    const {id,checked,item} = grocery;
                    return(
                       <li className='item' key={id}>
                            <input 
                                type="checkbox"
                                onChange={() => handleChange(id)}
                                checked={checked} 
                            />
                            <label 
                                style={(checked) ? 
                                {textDecoration:'line-through'}:null}
                            >
                                {item}
                            </label>
                            <FaTrashAlt 
                                role="button"
                                tabIndex="0"
                                onClick={() => handleDelete(id)}
                            />
                       </li> 
                    )
                })
            }
        </ul>
        }
    </>
  )
}

export default GroceryList