import api from './api'

export interface UserParams {
    firstName?: string
    userName?: string
    password?: string
    email?: string
    birthday?: string
    image?: string
    userUpdated?: boolean
    created_at?: string
}
interface PasswordParams {
    password: string
    newPassword: string
}
interface ResetParams {
    email: string
    newPassword: string
}

const profileService = {
    getUser: async () => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.get('/profile', {
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
            const res = await api.put('/profile', attributes, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.status
        } catch (error: any) {
            return error
        }
    },
    getUpdateUserEmail: async (attributes: UserParams) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.put('/profile/email', attributes, {
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
            const res = await api.put('/profile/password', attributes, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.status
        } catch (error: any) {
            return error
        }
    },
    resetPassword : async (attributes: ResetParams) => {
        try {
            const res = await api.put('/reset-password', attributes)
            return res.status

        } catch (error: any) {
            return error
        }
    }
}

export default profileService