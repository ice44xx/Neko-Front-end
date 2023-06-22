import api from './api'

interface Register {
    firstName: string,
    userName: string,
    email: string,
    birthday: string
    password: string,
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
    }
}

export default authService