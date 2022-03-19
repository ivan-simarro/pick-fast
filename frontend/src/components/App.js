import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/notes/').then(res => {
            setNotes(res.data)
            setLoading(false);
        })
    }, [])


    return (
        <div className="App">
            <h1>MY APP</h1>
            {
                !loading && <ul>{notes.map(note => <li key={note.id}>{note.body}</li>)}</ul>
            }
        </div>
    )
}