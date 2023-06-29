import api from './api'

interface UserParams {
    firstName?: string
    userName?: string
    password?: string
    email?: string
    image?: string
    created_at?: string
}
interface PasswordParams {
    password: string
    newPassword: string
}

const profileService = {
    getUser: async () => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.get('/users/current', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data
        } catch (error: any) {
            return error
        }
    },
    getUpdate: async (attributes: UserParams) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.put('/users/current', attributes, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.status
        } catch (error: any) {
            return error
        }
    },
    passwordUpdate : async (attributes: PasswordParams) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.put('/users/current/password', attributes, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.status
        } catch (error: any) {
            return error
        }
    }
}

export default profileService