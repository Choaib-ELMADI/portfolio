import React from 'react';
import { AiFillMail } from 'react-icons/ai';

import './Contact.scss';
import { Reveal } from '../../utils/index';



const Contact = () => {
  return (
    <div id='contact' className='contact section'>
      <Reveal width='fit-content'><h1>Contact<label>.</label></h1></Reveal>
      <Reveal width='fit-content'>
        <p>
          Shoot me an email if you want to connect! You can also find me on 
          <a href='https://www.linkedin.com/in/choaib-elmadi' target='_blank'> Linkedin </a> 
          or 
          <a href='https://www.twitter.com/curious_choaib' target='_blank'> Twitter </a> 
          if that's more your speed.
        </p>
      </Reveal>
      <Reveal width='fit-content'>
        <a className='mail' href='mailto:choaibamd@gmail.com'>
          <AiFillMail size={ 22 } /> 
          <span>choaibamd@gmail.com</span>
        </a>
        </Reveal>
    </div>
  );
};

export default Contact;
