import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './Collection';

const categories = [
    { name: 'Все' },
    { name: 'Море' },
    { name: 'Горы' },
    { name: 'Архитектура' },
    { name: 'Города' },
];

function App() {
    const [collections, setCollections] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [searchValue, setsearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://652e96670b8d8ddac0b1a44a.mockapi.io/Photos?page=${page}&limit=3&${
                categoryId ? `category=${categoryId}` : ''
            }`
        )
            .then((res) => res.json())
            .then((json) => setCollections(json))
            .catch((err) => {
                console.warn(err);
                alert('Ошибка при получении данных');
            })
            .finally(() => setIsLoading(false));
    }, [categoryId, page]);

    const onChangeCategory = (index) => {
        setCategoryId(index);
        setPage(1);
    };

    return (
        <div className='App'>
            <h1>Моя коллекция фотографий</h1>
            <div className='top'>
                <ul className='tags'>
                    {categories.map((obj, index) => (
                        <li
                            key={obj.name}
                            className={categoryId === index ? 'active' : ''}
                            onClick={() => onChangeCategory(index)}
                        >
                            {obj.name}
                        </li>
                    ))}
                </ul>
                <input
                    value={searchValue}
                    onChange={(e) => setsearchValue(e.target.value)}
                    className='search-input'
                    placeholder='Поиск по названию'
                />
            </div>
            <div className='content'>
                {isLoading ? (
                    <h3>Идет загрузка...</h3>
                ) : (
                    collections
                        .filter((obj) =>
                            obj.name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        )
                        .map((obj, index) => (
                            <Collection
                                key={index}
                                name={obj.name}
                                images={obj.photos}
                            />
                        ))
                )}
            </div>
            <ul className='pagination'>
                {[...Array(3)].map((_, index) => (
                    <li
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className={page === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
