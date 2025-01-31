import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ZoneSearch from './components/ZoneSearch';
import DeliveryConfigurator from './components/DeliveryConfigurator';
import ConfiguredZones from './components/ConfiguredZones';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <h1>Конфигуратор стоимости доставки</h1> {/* Исправлено: заголовок */}
                <ZoneSearch />
                <ConfiguredZones />
            </div>
        </Provider>
    );
};

export default App;