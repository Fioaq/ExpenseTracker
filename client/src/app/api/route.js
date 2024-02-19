import axios from "axios";


/* Session Routes */
export function login(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/session/login`, data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
export function logout() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/session/logout`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

/* User */
export function register(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/user/new`, data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function passwordResetToken(params = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/user/passwordReset`,
                {
                    params: params,
                    withCredentials: true
                });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function passwordReset(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/user/passwordReset`, data,
                {
                    withCredentials: true
                });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function findUser(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/user/${id}`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

/* Transactions */
export function findTransaction(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/transaction/${id}`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function newTransaction(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/transaction/new`, data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function editTransaction(id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/transaction/${id}`, data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function deleteTransaction(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}/transaction/${id}`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}