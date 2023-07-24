import api from './api'

export type CommentsType = {
    id?: number
    userId?: number
    animeId: number | null
    episodeId: number  | null
    content: string
    userName: string
    userPhoto: string
    createdAt?: Date
}
export type CommentsForGet = {
    id: number
    userId: number
    animeId: number
    episodeId: number  
    content: string
    userName: string
    userPhoto: string
    createdAt?: Date
    likeComments: number[];
}

const commentService = {
    delete: async (id: number) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const res = await api.delete(`/comments/${id}`, {headers});
            return res.data;
        } catch (error: any) {
            return error.response;
        }
    },
    getComments: async (episodeId: number) => {
        try {
            const res = await api.get(`/comments/${episodeId}`)
            return res.data
        } catch (error: any) {
            return error.response
        }
    },
    createComment: async (attributes: CommentsType) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.post('/comments', attributes, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return res
        } catch (error: any) {
            return error.response
        }
    },
    like: async (commentId: number) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.post(`/comment/like`, {commentId}, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return res.data
        } catch (error: any) {
            return error.response
        }
    },
    removeLike: async (commentId: number) => {
        try {
            const token = sessionStorage.getItem('nekoanimes-token')
            const res = await api.delete(`/comment/like/${commentId}`, {headers: {
                Authorization: `Bearer ${token}`
            }})
            return res
        } catch (error: any) {
            return error.response
        }
    }
}

export default commentService