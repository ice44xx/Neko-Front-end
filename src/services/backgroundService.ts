import api from "./api"

export type BackgroundType = {
    id: number
    background: string
}

const backgroundService = {
    getBackground: async () => {
        try {
            const res = await api.get('/background')
            return res
        } catch (error: any) {
            return error.response
        }
    }
}

export default backgroundService