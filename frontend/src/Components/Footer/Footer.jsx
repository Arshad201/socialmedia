import React from 'react';
import './Footer.css';

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div className='footer'>
      &#169; copyright {currentYear} | SocialBook
    </div>
  )
}

export default Footer
