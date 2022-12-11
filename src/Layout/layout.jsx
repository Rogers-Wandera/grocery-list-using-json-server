import React from 'react'

const Layout = ({children,heading,itemCount}) => {
  return (
    <div>
        <header>
            <h1>{heading}</h1>
        </header>
        {children}
        <footer>
            {
                itemCount.length > 0 ? `Total grocery List is ${itemCount.length}`: "No Items"
            }
        </footer>
    </div>
  )
}

export default Layout