import React from 'react'
import {useDispatch} from 'react-redux';
import homeImage from '../images/homeImage.jpg'

const Top = () => {
  const dispatch = useDispatch();
  
  return (
    <div>
      <img src={homeImage} alt="TopImage" className="image-box" />
    </div>
  )
}

export default Top
