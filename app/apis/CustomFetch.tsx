import * as SecureStore from 'expo-secure-store';
const API_URL = 'http://erpmaster.test/api/v1'; // Update with your API URL
const USER_TOKEN_KEY = 'auth_token'; // Update with your SecureStore key

const method = {
	POST: 'POST',
	GET: 'GET',
	PUT: 'PUT',
	DELETE: 'DELETE',
	PATH: 'PATH',
};

const getAuthHeader = async () => {
	const token = await SecureStore.getItemAsync(USER_TOKEN_KEY);
	return token === null
		? { Authorization: '' }
		: {
			Authorization: `Bearer ${token}`,
		};
};

const createJsonFetch = async (url: string, method: string, body: any = null, headers: any = {}) => {
	const authHeader = await getAuthHeader();
	const options: RequestInit = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			...authHeader,
			...headers,
		},
	};

	return body === null ? fetch(url, { ...options }) : fetch(url, { ...options, body: JSON.stringify(body) });
};

const createFetch = async (url: string, method: string, body: any = null, headers: any = {}) => {
	const authHeader = await getAuthHeader();
	const options: RequestInit = {
		method: method,
		headers: {
			...authHeader,
			...headers,
		},
	};

	return body === null ? fetch(url, { ...options }) : fetch(url, { ...options, body: JSON.stringify(body) });
};

export { method, createFetch, createJsonFetch };
