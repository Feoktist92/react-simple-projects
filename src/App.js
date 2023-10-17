import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [searchValue, setsearchValue] = useState('');
    const [invites, setInvites] = useState('');
    const [success, setSucces] = useState(false);

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((res) => res.json())
            .then((json) => setUsers(json.data))
            .catch((err) => {
                console.warn(err);
                alert('Ошибка при получении данных');
            })
            .finally(() => setIsLoading(false));
    }, []);

    const onChangeSearch = (event) => {
        setsearchValue(event.target.value);
    };
    const onclickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites((prev) => prev.filter((index) => index !== id));
        } else {
            setInvites((prev) => [...prev, id]);
        }
    };
    const onClickSendInvites = () => {
        setSucces(true);
    };

    return (
        <div className='App'>
            {success ? (
                <Success count={invites.length} />
            ) : (
                <Users
                    searchValue={searchValue}
                    onChangeSearch={onChangeSearch}
                    items={users}
                    isLoading={isLoading}
                    invites={invites}
                    onclickInvite={onclickInvite}
                    onClickSendInvites={onClickSendInvites}
                />
            )}
        </div>
    );
}

export default App;
