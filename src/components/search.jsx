import React from 'react'

const Search = ({value,onchange}) => {
  return (
    <form onSubmit={(e)=> e.preventDefault()}>
        <label>Search</label>
        <input 
            type="text" 
            placeholder='Search...'
            value={value}
            onChange={(e)=> onchange(e.target.value)}
        />
    </form>
  )
}

export default Search