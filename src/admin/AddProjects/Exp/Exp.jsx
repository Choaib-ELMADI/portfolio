import React, { useState, useEffect } from 'react';
import { doc, getDocs, collection, deleteDoc } from 'firebase/firestore';

import './Exp.scss';
import { db } from '../../../config/firebase';



const Exp = () => {
    const [availableExperiences, setAvailableExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [availableExperiences]);

    const fetchData = async () => {
        try {
            let experiences = [];
            const querySnapshot = await getDocs(collection(db, "experiences"));
            querySnapshot.forEach((doc) => {
                experiences.push({ id: doc.id, ...doc.data() });
            });
            setAvailableExperiences(experiences);
            setLoading(false);
        }
        catch(err) {
            console.error(err);
        }
    }
    
    const handleDelete = async (company) => {
        try {
            await deleteDoc(doc(db, "experiences", company.toLowerCase()));
            fetchData();
        }
        catch(err) {
            console.error(err);
        }
    };
    
    return (
        <div className='available-experiences'>
            {
                availableExperiences.length < 1 && (
                    <h2 className='no-available-experiences' style={{ color: 'var(--special__1)' }}>
                        {
                            loading ? 'Loading Experiences...' :
                            'No Experiences Yet'
                        }
                    </h2>
                )
            }
            {
                availableExperiences.length >= 1 &&
                <div className='available-experiences-wrapper'>
                    {
                        availableExperiences.map(availP => (
                            <div className='available-experience-wrapper' key={ availP.company }>
                                <h1>{ availP.company }</h1>
                                <div className='job'>
                                    <h3>{ availP.job }</h3>
                                    <p>{ availP.year }</p>
                                </div>
                                <p className='desc'>{ availP.description }</p>
                                <button
                                    onClick={ () => handleDelete(availP.company) }
                                >X</button>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default Exp;