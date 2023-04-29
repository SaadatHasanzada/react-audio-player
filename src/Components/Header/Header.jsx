import React from 'react'
import '../Header/header.css'
const Header = ({show,handleClick}) => {
  
  const styles={
    color: show ? "white" : "black"
  }
  return (
    <header>
        <span className='header--span'>Waves</span>
        <button onClick={handleClick} className={show ?  'header--button click' : 'header--button'}>Library <i className="fa-solid fa-music" style={styles}></i></button>
        </header>
  )
}

export default Header