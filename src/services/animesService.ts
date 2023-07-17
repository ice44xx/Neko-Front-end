import api from './api'
import { AnotherType, CategoryType } from './categoriesService'
import { CommentsType } from './commentService'
import { GenderType } from './genderService'
import { SeasonType } from './seasonsService'

export type EpisodesType = {
    id: number
    name: string
    synopsis: string
    episodeOrder: number
    videoUrl: string
    secondsLong: number
    comments?: CommentsType[]
}

export type AnimeType = {
    id: number
    name: string
    thumbnailUrl: string
    synopsis: string
    categories?: CategoryType
    anothers?: AnotherType
    gender?: GenderType
    seasons?: SeasonType[]
    episodes?: EpisodesType[]
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
    favorite: async (animeId: number | string) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.post('/favorites', {animeId}, {headers: {
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
    removeFavorite: async (animeId: number | string) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.delete(`/favorites/${animeId}`, {headers: {
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
    },
    getAnimePopular: async () => {
        try {
            const res = await api.get('/animes/popular')
            return res.data
        } catch (error) {
            return error
        }
    }
}

export default animeService;