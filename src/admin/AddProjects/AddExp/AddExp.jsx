import React, { useState, useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';

import { db } from '../../../config/firebase';
import './AddExp.scss';



const AddExp = () => {
    const [newExperience, setNewExperience] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExperience({ ...newExperience, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setDoc(doc(db, "experiences", newExperience.company.toLowerCase()), {
            ...newExperience
        })
        .then(() => {
            setNewExperience({
                company: '',
                year: '',
                job: '',
                place: '',
                description: '',
                technologies: '',
            });
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <div className='add-new-experience'>
            <form onSubmit={ handleSubmit }>
                <div className='experience-details'>
                    <div className='input-group'>
                        <label>Company:</label>
                        <input 
                            type='text'
                            name='company'
                            onChange={ handleChange }
                            value={ newExperience.company }
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label>Year:</label>
                        <input 
                            type='text'
                            name='year'
                            onChange={ handleChange }
                            value={ newExperience.year }
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label>Job:</label>
                        <input 
                            type='text'
                            name='job'
                            onChange={ handleChange }
                            value={ newExperience.job }
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label>Place:</label>
                        <input 
                            type='text'
                            name='place'
                            onChange={ handleChange }
                            value={ newExperience.place }
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label>Description:</label>
                        <input 
                            type='text'
                            name='description'
                            onChange={ handleChange }
                            value={ newExperience.description }
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label>Used Technologies:</label>
                        <input 
                            type='text'
                            name='technologies'
                            onChange={ handleChange }
                            value={ newExperience.technologies }
                            required
                        />
                    </div>
                </div>
                <button type='submit'>
                    Add Experience
                </button>
            </form>
        </div>
    );
};

export default AddExp;