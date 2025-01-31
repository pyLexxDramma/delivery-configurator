import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addZone, fetchZones } from '../redux/actions';

const ZoneSearch = () => {
    const dispatch = useDispatch();
    const zones = useSelector(state => state.delivery.zones); // Исправлено: доступ к состоянию
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchZones());
    }, [dispatch]);

    const filteredZones = zones.filter(zone => zone.name.startsWith(searchTerm));

    if (!zones.length) {
        return <p>Загрузка тарифных зон...</p>; // Добавлено: обработка загрузки
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск тарифных зон"
            />
            <ul>
                {filteredZones.map(zone => (
                    <li key={zone.id}>
                        {zone.name}
                        <button onClick={() => dispatch(addZone(zone))}>Добавить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ZoneSearch;