import { create } from 'zustand';


export const useDeliveryStore = create((set) => ({
    configuredZones: [],
    addZone: (zone) => set((state) => ({ configuredZones: [...state.configuredZones, zone] })),
    removeZone: (index) => set((state) => ({ configuredZones: state.configuredZones.filter((_, i) => i !== index) })),
    updateZoneBaseCost: (index, cost) => set((state) => {
        const newZones = [...state.configuredZones];
        newZones[index].baseCost = cost;
        return { configuredZones: newZones };
    }),
    addSurcharge: (zoneIndex, surcharge) => set((state) => {
        const newZones = [...state.configuredZones];
        newZones[zoneIndex].surcharges = [...(newZones[zoneIndex].surcharges || []), surcharge];
        return { configuredZones: newZones };
    }),
    removeSurcharge: (zoneIndex, surchargeIndex) => set((state) => {
        const newZones = [...state.configuredZones];
        newZones[zoneIndex].surcharges = newZones[zoneIndex].surcharges.filter((_, i) => i !== surchargeIndex);
        return { configuredZones: newZones };
    }),
    updateSurcharge: (zoneIndex, surchargeIndex, updatedSurcharge) => set((state) => {
        const newZones = [...state.configuredZones];
        newZones[zoneIndex].surcharges[surchargeIndex] = { ...newZones[zoneIndex].surcharges[surchargeIndex], ...updatedSurcharge };
        return { configuredZones: newZones };
    }),
}));
