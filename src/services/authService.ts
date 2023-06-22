import api from './api'

interface Register {
    firstName: string,
    userName: string,
    email: string,
    birthday: string
    password: string,
}
interface Login {
    email: string
    password: string
}

const authService = {
    register: async (attributes: Register) => {
        const res = await api.post('/auth/register', attributes).catch((error) => {
            if(error.response.status === 400) {
                return error.response
            }
            return error
        })
        
        return res
    },
    login: async (attributes: Login) => {
        const res = await api.post('/auth/login', attributes).catch((error) => {
            if(error.response.status === 400 || error.response.status === 401) {
                return error.response
            }
            return error
        })
        
        if (res.status === 201 || res.status === 200) {
            sessionStorage.setItem('nekoanimes-token', res.data.token)
        }

        return res
    }
}

export default authService