export const FETCH_ZONES = 'FETCH_ZONES';
export const ADD_ZONE = 'ADD_ZONE';
export const REMOVE_ZONE = 'REMOVE_ZONE';
export const ADD_SURCHARGE = 'ADD_SURCHARGE';
export const REMOVE_SURCHARGE = 'REMOVE_SURCHARGE';

export const fetchZones = () => async (dispatch) => {
    const response = await fetch('/zones.json');
    const data = await response.json();
    dispatch({ type: FETCH_ZONES, payload: data });
};

export const addZone = (zone) => ({ type: ADD_ZONE, payload: zone });
export const removeZone = (zoneId) => ({ type: REMOVE_ZONE, payload: zoneId });
export const addSurcharge = (zoneId, surcharge) => ({ type: ADD_SURCHARGE, payload: { zoneId, surcharge } });
export const removeSurcharge = (zoneId, index) => ({ type: REMOVE_SURCHARGE, payload: { zoneId, index } });
