import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
    // const [rates, setRates] = useState({});
    const ratesRef = useRef({});
    const [fromCurrency, setFromCurrency] = useState('RUB');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(1);

    useEffect(() => {
        fetch(
            'http://data.fixer.io/api/latest?access_key=e914c60e399f2844052748fc006766bf&format=1'
        )
            .then((res) => res.json())
            .then((json) => {
                ratesRef.current = json.rates;
                onChangeToPrice(1);
            })
            .catch((err) => {
                console.warn(err);
                alert('Не удалось получить данные:(');
            });
        // eslint-disable-next-line
    }, []);

    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency];
        const result = price * ratesRef.current[toCurrency];
        setToPrice(result.toFixed(2));
        setFromPrice(value);
    };
    const onChangeToPrice = (value) => {
        const result =
            (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) *
            value;
        setFromPrice(result.toFixed(2));
        setToPrice(value);
    };

    useEffect(() => {
        onChangeFromPrice(fromPrice);
        // eslint-disable-next-line
    }, [fromCurrency]);

    useEffect(() => {
        onChangeToPrice(toPrice);
        // eslint-disable-next-line
    }, [toCurrency]);

    return (
        <div className='App'>
            <Block
                value={fromPrice}
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency}
                onChangeValue={onChangeFromPrice}
            />
            <Block
                value={toPrice}
                currency={toCurrency}
                onChangeCurrency={setToCurrency}
                onChangeValue={onChangeToPrice}
            />
        </div>
    );
}

export default App;
