import React, { useEffect, useState } from 'react';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();
            setUser(data.results[0]);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px',backgroundColor:'pink' }}>
            <h1>REFRESH TIME RANDOMLY CHANGE DETAILS</h1>
            {loading && <p>Loading...</p>}
            {user && (
                <div className="user" style={{ margin: '20px' }}>
                    <h2>{user.name.first} {user.name.last}</h2>
                    <img src={user.picture.large} alt={user.name.first} style={{ borderRadius: '50%' }} />
                    <p>Email: {user.email}</p>
                    <p>Location: {user.location.city}, {user.location.country}<br />{user.location.postcode}</p>
                    <button onClick={fetchUser}>Generate New User</button>
                </div>
            )}
        </div>
    );
};

export default App;
