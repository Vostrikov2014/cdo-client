import React, { useEffect, useState } from 'react';
import axios from 'axios';

const conferenceServerUrl = 'http://localhost:8081/api/conferences';

const ConferenceList = () => {
    const [conferences, setConferences] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axios.get(conferenceServerUrl, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => setConferences(response.data))
                .catch(error => console.error('Failed to fetch conferences', error));
        }
    }, []);

    const addConference = () => {
        const token = localStorage.getItem('access_token');
        if (token && name) {
            axios.post(conferenceServerUrl, { name }, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => setConferences([...conferences, response.data]))
                .catch(error => console.error('Failed to add conference', error));
            setName('');
        }
    };

    const deleteConference = (id) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axios.delete(`${conferenceServerUrl}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(() => setConferences(conferences.filter(c => c.id !== id)))
                .catch(error => console.error('Failed to delete conference', error));
        }
    };

    return (
        <div>
            <h2>Conferences</h2>
            <ul>
                {conferences.map(conference => (
                    <li key={conference.id}>
                        {conference.name} <button onClick={() => deleteConference(conference.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New Conference Name" />
            <button onClick={addConference}>Add Conference</button>
        </div>
    );
};

export default ConferenceList;