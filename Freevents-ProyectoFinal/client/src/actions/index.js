import axios from "axios";

export const actionTypes ={
    getEvents:"getEvents",
    getProviders:"getProviders",
    getServices:"getServices",
    createService:"createService",
    createProvider:"createProvider",
    getDetails:"getDetails",
    getNamesProviders:"getNamesProviders",
    orderByName:"orderByName",
    clearDetails:"clearDetails",
    getPacks:"getPacks",
    getNamesPacks:"getNamesPacks",
    createUser:"createUser",
    getDetailsPacks:"getDetailsPacks",
    orderByNamePack:"orderByNamePack",
    filterPacksByService:"filterPacksByService",

};

export const filterPacksByService = (payload) =>{
    return{
        type: actionTypes.filterPacksByService,
        payload: payload,
    }
}

export const getEvents = () => {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/events`);
        return dispatch({
            type: actionTypes.getEvents,
            payload: json.data,
        });
    };
};

export const getProviders = () => {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/providers`);
        return dispatch({
            type: actionTypes.getProviders,
            payload: json.data,
        });
    };
};

export const getPacks = () => {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/packs`)
        return dispatch ({
            type: actionTypes.getPacks,
            payload: json.data,
        })
    }
};

export const getServices = () => {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/services`);
        return dispatch({
            type: actionTypes.getServices,
            payload: json.data,
        });
    };
};


export function createService(payload) {
    return async function () {
        try {
            const creado = await axios.post("http://localhost:3001/services", payload);
            return creado;
        } catch (error) {
            throw new Error(error);
        }
    };
};


export function createProvider(payload) {
    return async function () {
        console.log('que llega en payload', payload)
        try {
            const creado = await axios.post("http://localhost:3001/providers", payload);
            console.log(creado)
            return creado;
        } catch (error) {
            throw new Error(error);
        }
    };
};

export function createUser(payload) {
    return async function () {
        console.log('que llega en payload', payload)
        try {
            const creado = await axios.post("http://localhost:3001/client", payload);
            console.log(creado)
            return creado;
        } catch (error) {
            throw new Error(error);
        }
    };
};


export function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/providers/${id}`);
            return dispatch({
                type: actionTypes.getDetails,
                payload: json.data,
            });
        } catch (error) {
            return error.message;
        }
    };
};

export function getDetailsPacks(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/packs/${id}`);
            return dispatch({
                type: actionTypes.getDetailsPacks,
                payload: json.data,
            });
        } catch (error) {
            return error.message;
        }
    };
};


export const clearDetails = () => {
    return {
        type: actionTypes.clearDetails
    }
}

export function getNamesProviders(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/providers?name=" + name)
            return dispatch({
                type: actionTypes.getNamesProviders,
                payload: json.data
            })
        } catch (error) {
            return dispatch({
                type: actionTypes.getNamesProviders,
                payload: "ERROR"
            })
            
            
        }
    }
};

export function orderByName(payload){
    console.log(payload, "soy el payload")
    return{
        type:actionTypes.orderByName,
        payload
    }
}; 
export function orderByNamePack(payload){
    console.log(payload, "soy el payload")
    return{
        type:actionTypes.orderByNamePack,
        payload
    }
}; 

export function getNamesPacks(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/providers?name=" + name)
            return dispatch({
                type: actionTypes.getNamesPacks,
                payload: json.data
            })
        } catch (error) {
            return dispatch({
                type: actionTypes.getNamesPacks,
                payload: "ERROR"
            })
            
            
        }
    }
};