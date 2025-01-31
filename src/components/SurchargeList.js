import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSurcharge, removeSurcharge } from '../redux/actions';

const SurchargeList = ({ zoneId }) => {
    const dispatch = useDispatch();
    // Получаем наценки из Redux, используя безопасный доступ
    const surcharges = useSelector(state => state.surcharges[zoneId] || []);
    const [weight, setWeight] = useState('');
    const [surcharge, setSurcharge] = useState('');

    const handleAddSurcharge = () => {
        // Проверяем, что weight и surcharge не пустые
        if (weight && surcharge) {
            dispatch(addSurcharge(zoneId, { weight, surcharge }));
            setWeight('');
            setSurcharge('');
        } else {
            // Обработка ошибок, если поля пустые
            alert('Пожалуйста, заполните все поля.');
        }
    };

    return (
        <div>
            <h3>Наценки</h3>
            <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Вес (кг)"
            />
            <input
                type="text"
                value={surcharge}
                onChange={(e) => setSurcharge(e.target.value)}
                placeholder="Наценка"
            />
            <button onClick={handleAddSurcharge}>Добавить наценку</button>
            <ul>
                {surcharges.map((s, index) => (
                    <li key={index}>
                        {s.weight} кг - {s.surcharge}
                        <button onClick={() => dispatch(removeSurcharge(zoneId, index))}>Удалить наценку</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SurchargeList;
