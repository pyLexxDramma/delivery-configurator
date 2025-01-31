import { FETCH_ZONES, ADD_ZONE, REMOVE_ZONE, ADD_SURCHARGE, REMOVE_SURCHARGE } from './actions';

const initialState = {
    zones: [],
    configuredZones: [],
    surcharges: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ZONES:
            return { ...state, zones: action.payload };
        case ADD_ZONE:
            return { 
                ...state, 
                configuredZones: [...state.configuredZones, action.payload],
                surcharges: { ...state.surcharges, [action.payload.id]: [] }
            };
        case REMOVE_ZONE:
            const { [action.payload]: removedZone, ...remainingZones } = state.surcharges;
            return { 
                ...state, 
                configuredZones: state.configuredZones.filter(zone => zone.id !== action.payload),
                surcharges: remainingZones 
            };
        case ADD_SURCHARGE:
            return { 
                ...state, 
                surcharges: { 
                    ...state.surcharges, 
                    [action.payload.zoneId]: [...state.surcharges[action.payload.zoneId], action.payload.surcharge] 
                } 
            };
        case REMOVE_SURCHARGE:
            return { 
                ...state, 
                surcharges: { 
                    ...state.surcharges, 
                    [action.payload.zoneId]: state.surcharges[action.payload.zoneId].filter((_, index) => index !== action.payload.index) 
                } 
            };
        default:
            return state;
    }
};

export default reducer;
