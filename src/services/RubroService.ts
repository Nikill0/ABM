import { Rubro } from '../types/Rubro';


const BASE_URL = 'https://example-service-thrid.onrender.com';


export const RubroService = {

    getRubros: async (): Promise<Rubro[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubro`);
        const data = await response.json();
        return data;
    },

    getRubro: async (id: number): Promise<Rubro> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubro/${id}`);
        const data = await response.json();
        return data;
    },

    createRubro: async (rubro: Rubro): Promise<Rubro> => {
        const response = await fetch(`${BASE_URL}//api/v1/rubro`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
        return data;
    },

    updateRubro: async (id: number, rubro: Rubro): Promise<Rubro> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubro/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
        return data;
    },

    deleteRubro: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/rubro/${id}`, {
            method: "DELETE"
        });
    }

};