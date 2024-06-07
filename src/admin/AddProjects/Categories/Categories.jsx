import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { setDoc, doc, getDocs, collection, deleteDoc } from 'firebase/firestore';

import './Categories.scss';
import { db } from '../../../config/firebase';



const Categories = () => {
    const [newCategory, setNewCategory] = useState('');
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [availableCategories]);

    const fetchData = async () => {
        try {
            let categories = [];
            const querySnapshot = await getDocs(collection(db, "categories"));
            querySnapshot.forEach((doc) => {
                categories.push({ id: doc.id, ...doc.data() });
            });
            setAvailableCategories(categories);
            setLoading(false);
        }
        catch(err) {
            console.error(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newNewCategory = '';
        if (newCategory.includes('/')) {
            newNewCategory = newCategory.replace('/', '||SLASH||');
        } else {
            newNewCategory = newCategory;
        }
        
        setDoc(doc(db, "categories", newNewCategory.toLowerCase()), {
            name: newCategory,
        })
        .then(() => {
            setNewCategory('');
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteDoc(doc(db, "categories", id));
        }
        catch(err) {
            console.error(err);
        }
    };

    return (
        <div className='projects-categories-container'>
            <form onSubmit={ handleSubmit }>
                <input 
                    type='text' 
                    placeholder='JavaScript, Nodejs, Laravel...' 
                    className='add-category-input'
                    value={ newCategory }
                    onChange={ (e) => setNewCategory(e.target.value) }
                    required
                />
                <button type='submit' disabled={ newCategory === '' }>Add</button>
            </form>
            <div className='available-categories'>
                {
                    availableCategories.length < 1 && (
                        <h2 style={{ color: 'var(--special__1)' }}>
                            {
                                loading ? 'Loading Categories...' :
                                'No Categories Yet'
                            }
                        </h2>
                    )
                }
                {
                    availableCategories.length >= 1 && (
                        availableCategories.map((cat => (
                            <div className='category' key={ cat.id }>
                                <label>{ cat.name }</label>
                                <button
                                    onClick={ () => handleDeleteCategory(cat.id) }
                                >
                                    <IoClose size={ 20 } className='icon' />
                                </button>
                            </div>
                        )))
                    )
                }
            </div>
        </div>
    );
};

export default Categories;