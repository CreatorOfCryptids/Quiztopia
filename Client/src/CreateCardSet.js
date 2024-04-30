import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateCardSet.css';

const CreateCardSet = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashCards, setFlashcards] = useState([]);
    const [set_id, setId] = useState('');

    const {folderID} = useParams();

    const handleCreateSet = (event) => {
        event.preventDefault();
        setFlashcards([]);
        axios.post('http://localhost:9000/createSet', { parent : folderID, title, description })
            .then((res) => {
                const newSetId = res.data._id
                setId(newSetId);
                alert('Set created successfully')
                navigate(`/viewCardSet/${newSetId}`);
            })
            .catch((err) => {
                alert('Error creating set')
            });
    };

    return (
        
        <form className='CreateCardSet' onSubmit={(event) => handleCreateSet(event)}>
            <h1>Create Set</h1>
            <div className='title'>
            <label>
                Title: 
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            </div>
            <br />
            <div className='desc'>
            <label>
                Description: 
                <input
                    type="textvalue"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            </div>
            <button
              type = 'submit'
              onClick={handleCreateSet}
            >Create Set</button>
            
        </form>
    );
};

export default CreateCardSet;
