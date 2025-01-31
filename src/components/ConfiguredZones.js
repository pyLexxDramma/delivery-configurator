import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SurchargeList from './SurchargeList';
import { removeZone } from '../redux/actions';

const ConfiguredZones = () => {
    const dispatch = useDispatch();
    const configuredZones = useSelector(state => state.delivery.configuredZones); // Исправлено: доступ к состоянию

    if (configuredZones.length === 0) {
        return <p>Нет настроенных тарифных зон</p>; // Добавлено: обработка пустого состояния
    }

    return (
        <div>
            <h2>Настроенные тарифные зоны</h2>
            <ul>
                {configuredZones.sort((a, b) => a.name.localeCompare(b.name)).map(zone => (
                    <li key={zone.id}>
                        {zone.name} - {zone.baseCost} руб.
                        <button onClick={() => dispatch(removeZone(zone.id))}>Удалить</button>
                        <SurchargeList zoneId={zone.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConfiguredZones;