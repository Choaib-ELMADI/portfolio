import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../config/firebase';
import './ProjectButtons.scss';



const Modal = () => {
    return (
        <div className='btn-modal'></div>
    );
};

const ProjectButtons = ({ filterProjects, activeBtn, setActiveBtn }) => {
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let btns = [];
                const quertSnapshot = await getDocs(collection(db, "categories"));
                quertSnapshot.forEach(btn => {
                    btns.push({ ...btn.data() });
                });
                setButtons(btns);
            }
            catch(err) {
                console.error(err);
            }
        }

        fetchData();
    }, []);    

    return (
        <div className='project-buttons'>
            {
                buttons.length < 1 ? 
                <>
                    <Modal />
                    <Modal />
                    <Modal />
                    <Modal />
                    <Modal />
                </>
                :
                buttons.map(b => (
                    <button 
                        key={ b.name }
                        className={ b.name === activeBtn ? 'active' : '' }
                        onClick={ () => {
                            setActiveBtn(b.name);
                            filterProjects(b.name);
                        }}
                    >
                        { b.name }
                    </button>
                ))
            }
        </div>
    );
};

export default ProjectButtons;