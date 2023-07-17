import { AnimeType, EpisodesType } from './animesService'
import api from './api'

export type SeasonType = {
    id: number
    name: string
    order: number
    episodes?: EpisodesType[]
}

const seasonsService = {
    getSeasons: async (id: number) => {
        try {
            const res = await api.get(`/seasons/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    getOneSeason: async (id: number) => {
        try {
            const res = await api.get(`/seasons/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    }
} 

export default seasonsService
