import React, { useState } from 'react';
import { useDeliveryStore } from '../redux/useDeliveryStore';

const DeliveryConfigurator = () => {
    const [saveMessage, setSaveMessage] = useState('');
    const { configuredZones, addZone, removeZone, updateZoneBaseCost, addSurcharge, removeSurcharge, updateSurcharge } = useDeliveryStore();

    const handleSave = () => {
        // Валидация
        let isValid = true;
        const errors = [];

        if (configuredZones.length === 0) {
            isValid = false;
            errors.push('Доставка не настроена');
        }

        configuredZones.forEach((zone, zoneIndex) => {
            if (!zone.baseCost) {
                isValid = false;
                errors.push(`Укажите базовую стоимость для зоны ${zone.name}`);
            }
            if (zone.surcharges) {
                zone.surcharges.forEach((surcharge, surchargeIndex) => {
                    if (!surcharge.weightFrom || !surcharge.weightTo || !surcharge.surchargeValue) {
                        isValid = false;
                        errors.push(`Укажите вес и наценку для зоны ${zone.name}, наценка ${surchargeIndex + 1}`);
                    }
                });
            }
        });

        if (isValid) {
            console.log('Сохранено:', configuredZones);
            setSaveMessage('Сохранено');
        } else {
            setSaveMessage(errors.join('\n'));
        }
    };

    const handleBaseCostChange = (index, value) => {
        const parsedValue = parseFloat(value.replace(',', '.'));
        if (!isNaN(parsedValue)) {
            updateZoneBaseCost(index, parsedValue.toFixed(2));
        }
    };

    const handleSurchargeChange = (zoneIndex, surchargeIndex, fieldName, value) => {
        const parsedValue = parseFloat(value.replace(',', '.'));
        updateSurcharge(zoneIndex, surchargeIndex, { [fieldName]: !isNaN(parsedValue) ? parsedValue : value });
    };

    return (
        <div>
            <h1>Конфигуратор стоимости доставки</h1>
            <ul>
                {configuredZones.sort((a, b) => a.name.localeCompare(b.name)).map((zone, index) => (
                    <li key={index}>
                        {zone.name}
                        <input type="number" step="0.01" value={zone.baseCost || ''} onChange={(e) => handleBaseCostChange(index, e.target.value)} /> руб.
                        <button onClick={() => removeZone(index)}>Удалить</button>
                        <button onClick={() => addSurcharge(index, { weightFrom: '', weightTo: '', surchargeValue: 0 })}>Добавить наценку</button>
                        {zone.surcharges && zone.surcharges.map((surcharge, surchargeIndex) => (
                            <div key={surchargeIndex}>
                                <label>Вес от:</label>
                                <input type="text" value={surcharge.weightFrom || ''} onChange={(e) => handleSurchargeChange(index, surchargeIndex, 'weightFrom', e.target.value)} /> кг
                                <label>Вес до:</label>
                                <input type="text" value={surcharge.weightTo || ''} onChange={(e) => handleSurchargeChange(index, surchargeIndex, 'weightTo', e.target.value)} /> кг
                                <label>Наценка:</label>
                                <input type="text" value={surcharge.surchargeValue || ''} onChange={(e) => handleSurchargeChange(index, surchargeIndex, 'surchargeValue', e.target.value)} /> руб.
                                <button onClick={() => removeSurcharge(index, surchargeIndex)}>Удалить наценку</button>
                                <p>Конечная стоимость: {(parseFloat(zone.baseCost || 0) + parseFloat(surcharge.surchargeValue || 0)).toFixed(2)} руб.</p>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
            <button onClick={handleSave}>Сохранить изменения</button>
            <p>{saveMessage}</p>
        </div>
    );
};

export default DeliveryConfigurator;
