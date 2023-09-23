import React from 'react'

import classes from './Header.module.css'
import meals from '../../assets/meals.jpg'
import HeaderCardButton from './HeaderCardButton'

const Header = (props) => {
  return (
      <div>
          <header className={classes.header}>
              <h1>ReactMeals</h1>
              <HeaderCardButton onClick={ props.onShowCart} />
          </header>
          <div className={classes['main-image']}> 
              <img src={meals} alt="meals Image" />
          </div>


    </div>
  )
}

export default Header