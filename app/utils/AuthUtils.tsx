import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface RegisterParams {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

interface LoginParams {
    email: string;
    password: string;
}

export interface AuthResult {
    success: boolean;
    redirectTo?: string;
    error?: {
        message: string;
        name: string;
    };
}

const API_URL = 'http://erpmaster.test/api/v1';

const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error('Error storing data:', e);
    }
};

const getData = async (key: string): Promise<any | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Error getting data:', e);
        return null;
    }
};

export const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('auth_token');
        // Check if there is cached data
        const cachedData = await AsyncStorage.getItem('user_profile');

        const response = await axios.get(`${API_URL}/user-info`, {
            headers: {
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${token}`,
            },
        });

        // Cache the new data
        await AsyncStorage.setItem('user_profile', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.error('A problem occurred:', error);
        throw error;
    }
};

export const register = async ({
    name,
    email,
    password,
    phone,
    address,
}: RegisterParams): Promise<AuthResult> => {

    try {
        const response = await fetch(`${API_URL}/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name, phone, address }),

            });

        if (response.ok) {
            const { token } = await response.json();

            // Store the token in cache
            storeData('auth_token', token);

            return { success: true, redirectTo: '/' };
        } else {
            console.error('Registration failed. Status:', response.status);
            const errorData = await response.json();
            console.error('Error details:', errorData);
            return {
                success: false,
                error: {
                    message: 'Registration failed',
                    name: 'Invalid registration details',
                },
            };
        }
    } catch (error) {
        console.error('Registration request failed:', error);
        return {
            success: false,
            error: {
                message: 'Registration request failed',
                name: 'Network error',
            },
        };
    }
};

export const login = async ({ email, password }: LoginParams): Promise<AuthResult> => {

    try {
        // Attempt to fetch token from cache
        const cachedToken = await getData('auth_token');

        if (cachedToken) {
            return { success: true, redirectTo: '/' };
        }

        const response = await fetch(`${API_URL}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

        if (response.ok) {
            const { token } = await response.json();

            // Store the token in cache
            storeData('auth_token', token);

            return { success: true, redirectTo: '/' };
        } else {
            console.error('Login failed. Status:', response.status, response);
            const errorData = await response.json();
            console.error('Error details:', errorData);

            // Dynamically generate the error message based on the received error details
            const errorMessage =
                errorData.errors && errorData.errors.email
                    ? errorData.errors.email[0]
                    : 'Invalid email or password';

            return {
                success: false,
                error: {
                    message: errorMessage,
                    name: 'Login failed',
                },
            };
        }
    } catch (error) {
        console.error('Login request failed:', error);
        return {
            success: false,
            error: {
                message: 'Network error',
                name: 'Login request failed',
            },
        };
    }
};

export const logout = async (): Promise<AuthResult> => {
    // Remove token from cache
    await AsyncStorage.removeItem('auth_token');

    return { success: true, redirectTo: '/login' };
};
export const onError = async (error: any): Promise<{ error: any }> => {
    console.error(error);
    return { error: error };
};

export const check = async (): Promise<{ authenticated: boolean; redirectTo?: string }> => {
    const auth_token = await getData('auth_token');

    if (auth_token) {
        return { authenticated: true };
    } else {
        return {
            authenticated: false,
            redirectTo: '/login',
        };
    }
};