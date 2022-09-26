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
    addToFavs: "addToFavs",
    removeOneFromCart:"removeOneFromCart",
    removeAllFromCart: "removeAllFromCart",
    clearCart:"clearCart",
    orderByPrice:"orderByPrice",
    getOrder:"getOrder",
    postOrder:"postOrder",
    getNamesPaquetes:"getNamesPaquetes",
    addToOrder:"addToOrder",

};

export const getOrder = () => {
    return async function (dispatch) {
        var json = await axios.get(`/order`);
        return dispatch({
            type: actionTypes.getOrder,
            payload: json.data,
        });
    };
};
export function postOrder(payload) {
    return async function () {
        try {
            const creado = await axios.post("/order", payload);
            console.log(creado)
            return creado;
        } catch (error) {
            throw new Error(error);
        }
    };
};



export const filterPacksByService = (payload) =>{
    return{
        type: actionTypes.filterPacksByService,
        payload: payload,
    }
}

export const getEvents = () => {
    return async function (dispatch) {
        var json = await axios.get(`/events`);
        return dispatch({
            type: actionTypes.getEvents,
            payload: json.data,
        });
    };
};



export const getProviders = () => {
    return async function (dispatch) {
        var json = await axios.get(`/providers`);
        return dispatch({
            type: actionTypes.getProviders,
            payload: json.data,
        });
    };
};

export function orderByPrice(payload){
    console.log(payload, "soy el payload")
    return{
        type:actionTypes.orderByPrice,
        payload
    }
}; 

export const getPacks = () => {
    return async function (dispatch) {
        var json = await axios.get(`/packs`)
        return dispatch ({
            type: actionTypes.getPacks,
            payload: json.data,
        })
    }
};

export const getServices = () => {
    return async function (dispatch) {
        var json = await axios.get(`/services`);
        return dispatch({
            type: actionTypes.getServices,
            payload: json.data,
        });
    };
};


export function createService(payload) {
    return async function () {
        try {
            const creado = await axios.post("/services", payload);
            return creado;
        } catch (error) {
            throw new Error(error);
        }
    };
};


export function createProvider(payload) {
    return async function () {
        try {
            const creado = await axios.post("/providers", payload);
            console.log(creado)
            return creado;
        } catch (error) {
            throw new Error(error);
        }
    };
};

export function createUser(payload) {
    return async function () {
        try {
            const creado = await axios.post("/client", payload);
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
            var json = await axios.get(`/providers/${id}`);
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
            var json = await axios.get(`/packs/${id}`);
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
export const addToOrder = detalleP => async dispatch => {
    const order = localStorage.getItem('order')//SI EL ITEM EXISISTE
		? JSON.parse(localStorage.getItem('order'))
		: [];

        const duplicates = order.filter(orderItem => orderItem.id === detalleP.id);
	// if no duplicates, proceed
	if (duplicates.length === 0) {
		// prep product data
		const detallePToAdd = {
			...detalleP,
			
		}
        order.push(detallePToAdd);
    }
		localStorage.setItem('order', JSON.stringify(order));
		// add cart to redux
		dispatch({
			type: actionTypes.addToOrder,
			payload: order,
		});
	
};


export const addToFavs = product => async dispatch => {
	// if cart already exists in local storage, use it, otherwise set to empty array
	const favs = localStorage.getItem('favs')//SI EL ITEM EXISISTE
		? JSON.parse(localStorage.getItem('favs'))
		: [];
	// check if duplicates
	const duplicates = favs.filter(favsItem => favsItem.id === product.id);
	// if no duplicates, proceed
	if (duplicates.length === 0) {
		// prep product data
		const productToAdd = {
			...product,
			// count: 1,
		}
        favs.push(productToAdd);
    }
		localStorage.setItem('favs', JSON.stringify(favs));
		// add cart to redux
		dispatch({
			type: actionTypes.addToFavs,
			payload: favs,
		});
	
};


export function getNamesProviders(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/providers?name=" + name)
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

export function getNamesPacks(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/packs?name=" + name)
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

export function orderByName(payload){
    return{
        type:actionTypes.orderByName,
        payload
    }
}; 

export function orderByNamePack(payload){
    return{
        type:actionTypes.orderByNamePack,
        payload
    }
}; 

