import api from './api'
import { CategoryType } from './categoriesService'
import { GenderType } from './genderService'

export type EpisodesType = {
    id: number
    name: string
    synopsis: string
    order: number
    videoUrl: string
    secondsLong: number
}

export type AnimeType = {
    id: number
    name: string
    thumbnailUrl: string
    synopsis: string
    episodes?: EpisodesType[]
    categories?: CategoryType
    gender?: GenderType
}

const animeService = {
    getNewestAnimes: async () => {
        try {
            const res = await api.get('/animes/newest')
            return res
        } catch (error: any) {
            //console.log(error.response.data.message)
            return error.response
        }
    },
    getFeaturedAnimes: async () => {
        try {
            const res = await api.get('/animes/featured')
            return res
        } catch (error: any) {
            return error.response
        }
    },
    addFavorite: async (animeId: number | string) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.post('/favorites', {animeId}, {headers: {
                Authorization: `Bearer ${token}`
            }
            })
            return res
        } catch (error: any) {
            return error.response
        }
    },
    removeFavorite: async (animeId: number | string) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.delete('/favorites', {headers: {
                Authorization: `Bearer ${token}`
            },
            data: {animeId}
        })
        return res
        } catch (error: any) {
            return error.response
        }
    },
    getFavorites: async () => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.get('/favorites', {headers: {
                Authorization: `Bearer ${token}`
            }})
            return res
        } catch (error: any) {
            return error.response
        }
    },
    like: async (animeId: number) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.post('/likes', {animeId}, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return res
        } catch (error: any) {
            return error.response
        }
    },
    removeLike: async (animeId: number) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.delete(`/likes/${animeId}`, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return res
        } catch (error: any) {
            return error.response
        }
    },
    findAll: async () => {
        try {
            const res = await api.get('/animes')
            return res

        } catch (error: any) {
            return error
        }
    },
    getSearch: async (name: string) => {
        try {
          const res = await api.get(`/animes/search/${name}`);
          return res.data
        } catch (error) {
          return error
        }
    },
    getAnime: async (name: string) => {
        try {
            const res = await api.get(`animes/${name}`)
            return res.data
            
        } catch (error) {
            return error
        }
    }
}

export default animeService;