import React, { useState, useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import './AddProject.scss';
import images from '../../../constants/images';
import { db, store } from '../../../config/firebase';



const AddProject = ({ newProjectInfo, setNewProjectInfo, projectProfile, setProjectProfile }) => {
    const [uploadingProgress, setUploadingProgress] = useState(0);

    useEffect(() => {
        const uploadFile = () => {
            const name = projectProfile.name;
            const storageRef = ref(store, `/projectProfiles/${ name }`);
            const uploadTask = uploadBytesResumable(storageRef, projectProfile);
    
            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadingProgress(progress);
                }, 
                (error) => {
                    console.error(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setNewProjectInfo((prev) => ({ ...prev, image: downloadURL }));
                        });
                }
            );
        };
    
        projectProfile && uploadFile();
    }, [projectProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProjectInfo({ ...newProjectInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setDoc(doc(db, "projects", newProjectInfo.name.toLowerCase().replace(" ", "_")), {
            ...newProjectInfo
        })
        .then(() => {
            setNewProjectInfo({
                name: '',
                category: '',
                description: '',
                paragraph_01: '',
                paragraph_02: '',
                paragraph_03: '',
                paragraph_04: '',
                technologies: '',
                link: '',
            });
            setProjectProfile(null);
            setUploadingProgress(0);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <div className='add-new-project'>
            <form onSubmit={ handleSubmit }>
                <div className='project-details'>
                    <div className='add-project-profile'>
                        <h2>Upload project profile</h2>
                        <img 
                            src={ projectProfile ?
                                URL.createObjectURL(projectProfile) : 
                                images.no_image 
                            } 
                            alt={ projectProfile ?
                                projectProfile.name :
                                'No Image'
                            }
                            draggable='false'
                        />
                        <label htmlFor="profile-project">Choose Profile</label>
                        <input 
                            name='profile-project'
                            type="file" 
                            id="profile-project" 
                            onChange={ (e) => setProjectProfile(e.target.files[0]) }
                        />
                    </div>
                    <div className='text-inputs'>
                        <div className='input-group'>
                            <label>Project Name:</label>
                            <input 
                                type='text'
                                name='name'
                                onChange={ handleChange }
                                value={ newProjectInfo.name }
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Project Category:</label>
                            <input 
                                type='text'
                                name='category'
                                onChange={ handleChange }
                                value={ newProjectInfo.category }
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Description:</label>
                            <input 
                                type='text'
                                name='description'
                                onChange={ handleChange }
                                value={ newProjectInfo.description }
                                required
                            />
                        </div>
                        <br />
                        <div className='input-group'>
                            <label>Paragraph 01:</label>
                            <input 
                                type='text'
                                name='paragraph_01'
                                onChange={ handleChange }
                                value={ newProjectInfo.paragraph_01 }
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Paragraph 02:</label>
                            <input 
                                type='text'
                                name='paragraph_02'
                                onChange={ handleChange }
                                value={ newProjectInfo.paragraph_02 }
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Paragraph 03:</label>
                            <input 
                                type='text'
                                name='paragraph_03'
                                onChange={ handleChange }
                                value={ newProjectInfo.paragraph_03 }
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Paragraph 04:</label>
                            <input 
                                type='text'
                                name='paragraph_04'
                                onChange={ handleChange }
                                value={ newProjectInfo.paragraph_04 }
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Used technologies <small>(Separated by ;) </small>:</label>
                            <input 
                                type='text'
                                name='technologies'
                                onChange={ handleChange }
                                value={ newProjectInfo.technologies }
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Project link:</label>
                            <input 
                                type='text'
                                name='link'
                                onChange={ handleChange }
                                value={ newProjectInfo.link }
                                required
                            />
                        </div>
                    </div>
                </div>
                <button 
                    type='submit'
                    disabled={ uploadingProgress !== 100 }
                >
                    Add Project
                </button>
            </form>
        </div>
    );
};

export default AddProject;