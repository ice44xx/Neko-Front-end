import { AnimeType } from './animesService'
import api from './api'

export type GenderType = {
    id: number
    name: string
    position: number
    animes?: AnimeType
}

const genderService = {
    getGender: async (name: string) => {
        try {
            const res = await api.get(`/gender/${name}`)
            return res

        } catch (error: any) {
            return error
        } 
    }
}

export default genderService