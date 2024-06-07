import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../config/firebase';
import './Exp.scss';
import { Title, Reveal, Experience } from '../../utils/index';
import { NoItems } from '../../components/index';



const Modal = () => {
  return (
    <div className='experience-modal' />
  );
};

const Exp = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let exp = [];
        const experiencesQuery = await getDocs(collection(db, "experiences"));
        experiencesQuery.forEach((experience) => {
          exp.push({ id: experience.id, ...experience.data() });
        })
        setExperiences(exp);
        setLoading(false);
      }
      catch(err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);
  

  return (
    <div id='exp.' className='experiences section'>
      <Reveal width='100%'><Title title='Experience' left={ true } /></Reveal>

      <div className='experiences__wrapper'>
        {
          loading ?
          <>
            <Modal />
          </> 
          :
          <>
            {
              experiences.length < 1 ?
              <NoItems name='Experience' />
              :
              experiences.map((experience, i) => (
                <Experience key={ `Experience-${ i }` } data={ experience } />
              ))
            }
          </>
        }
        
      </div>
    </div>
  );
};

export default Exp;