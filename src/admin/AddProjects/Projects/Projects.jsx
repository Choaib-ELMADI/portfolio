import React, { useState, useEffect } from 'react';
import { doc, getDocs, collection, deleteDoc, updateDoc } from 'firebase/firestore';

import './Projects.scss';
import { db } from '../../../config/firebase';



const Projects = () => {
    const [availableProjects, setAvailableProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [availableProjects]);

    const fetchData = async () => {
        try {
            let projects = [];
            const querySnapshot = await getDocs(collection(db, "projects"));
            querySnapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
            setAvailableProjects(projects);
            setLoading(false);
        }
        catch(err) {
            console.error(err);
        }
    }
    
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "projects", id));
            fetchData();
        }
        catch(err) {
            console.error(err);
        }
    };
    
    return (
        <div className='available-projects'>
            {
                availableProjects.length < 1 && (
                    <h2 className='no-available-projects' style={{ color: 'var(--special__1)' }}>
                        {
                            loading ? 'Loading Projects...' :
                            'No Projects Yet'
                        }
                    </h2>
                )
            }
            {
                availableProjects.length >= 1 &&
                <div className='available-projects-wrapper'>
                    {
                        availableProjects.map(availP => (
                            <div className='available-project-wrapper' key={ availP.name }>
                                <div className='project-profile'>
                                    <img src={ availP.image } alt='Project Profile' />
                                </div>
                                <div className='title'>
                                    <h2>{ availP.name }</h2>
                                    <p>{ availP.category }</p>
                                </div>
                                <p className='desc'>{ availP.description }</p>
                                <button 
                                    className='remove'
                                    onClick={ () => handleDelete(availP.id) }
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default Projects;