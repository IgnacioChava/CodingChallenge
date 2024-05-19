import axios, {
	AxiosError,
	AxiosInstance,
	InternalAxiosRequestConfig,
} from 'axios';
import { getSessionToken, removeSessionToken } from './cookies.service';
import { isNill } from '../utils/comon.utils';
import { Login, LoginResponse, Pokemon, PokemonCreate, PokemonUpdate } from '../models/poke.models';
import { GenericResponse } from '../models/api.models';

const apiInstance: AxiosInstance = axios.create({
	baseURL: 'http://localhost:5000',
});


apiInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = getSessionToken();

		if (!isNill(token)) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	async error => {
		return await Promise.reject(error);
	},
)


apiInstance.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		console.log(JSON.stringify(error.data));
		if (error.status === 401 && error.data.code === 40103) {
			removeSessionToken();
		}
		return await Promise.reject(error);
	},
);



export const getPokes = async () => {

	let response;
	let failed = false;
	let success = !failed; 
	try {
		 const call = "/poke"
		 response = await apiInstance.get<Pokemon[]>(call);
		 return {response, failed, success}
	} catch (error) {
		failed = true;
		return {error,failed, success}; // Lanza el error si ocurre uno
	}

} 

export const getPokeByName = async (name:string) => {

	let response;
	let failed = false;
	let success = !failed; 
	try {
		 const call = `/Poke/${name}`
		 response = await apiInstance.get<Pokemon>(call);
		 return {response, failed, success}
	} catch (error) {
		failed = true;
		return {error,failed, success}; 
	}

} 

export const deletePokeByName = async (name:string) => {

	let response;
	let failed = false;
	let success = !failed; 
	try {
		 const call = `/Poke/deletePoke/${name}`
		 response = await apiInstance.delete<string>(call);
		 return {response, failed, success}
	} catch (error) {
		failed = true;
		return {error,failed, success}; 
	}

} 

export const insertPokes = async () => {

	let response;
	let failed = false;
	let success = !failed; 
	try {
		 const call = "/Poke/InsertPokemons"
		 response = await apiInstance.post<Pokemon[]>(call);
		 return {response, failed, success}
	} catch (error) {
		failed = true;
		return {error,failed, success}; 
	}

} 


export const postLogin = async (values: Login) => {
	let response;
	let failed = false;
	let success = !failed; 
	try {
		response = await apiInstance.post<LoginResponse>("api/auth/login", values);
		return {response, failed, success}; 
	} catch (error) {
		failed = true;
		return {error, failed, success}; 
	}
}

export const postSignUp = async (values: Login) => {
	let response;
	let failed = false;
	let success = !failed; 
	try {
		response = await apiInstance.post<string>("api/auth/signup", values);
		return {response, failed, success}; 
	} catch (error) {
		failed = true;
		return {error, failed, success};
	}
}


export const createPoke = async (values: PokemonCreate) => {
	try {
		const response = await apiInstance.post<string>("/Poke", values);
		return response.data; 
	} catch (error) {
		throw error; 
	}
}

export const updatePoke = async (values: PokemonUpdate) => {
	try {
		const response = await apiInstance.put<string>("/Poke", values);
		return response.data; 
	} catch (error) {
		throw error; 
	}
}

