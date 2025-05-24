import { db } from "../libs/db.js"

export const createPlaylist = async(req, res) => {
    try {
        const {name, description} = req.body

        const userId = req.user.id

        const playlist = await db.playlist.create({
            data: {
                name,
                description,
                userId
            }
        })

        res.status(200).json({
            success: true,
            message: "Playlist created successsfully",
            playlist
        })

    } catch (error) {
        console.error("Error creating playlist:", error)
        res.status(500).json({
            error: "Failed to create playlist"
        })
    }
}

export const getAllPlaylistDetails = async(req, res) => {
    try {
        const playlists = await db.playlist.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                problems:{
                    include:{
                        problem: true
                    }
                }
            }
        })

        res.status(200).json({
            success: true,
            message: "Playlists fetched successfully",
            playlists
        })
    } catch (error) {
        console.error("Error fetching playlists:", error)
        res.status(500).json({
            error: "Failed to fetch playlists"
        })
    }
}

export const getPlaylistDetails = async(req, res) => {
    const { playlistId } = req.params

    try {
        const playlist = await db.playlist.findUnique({
            where: {
                id: playlistId,
                userId: req.user.id
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        })

        if(!playlist){
            return res.status(400).json({error: "Playlist not found"})
        }

        res.status(200).json({
            success: true,
            message: "Playlist details are fetched",
            playlist
        })
    } catch (error) {
        console.error("Error fetching playlist details:", error)
        res.status(500).json({error: "Failed to fetch playlist details"})
    }
}


export const addProblemToPlaylist = async(req, res) => {
     const {playlistId} = req.params
     const {problemIds} = req.body

     try {
        if(!Array.isArray(problemIds) || problemIds.length === 0){
            return res.status(400).json({
                error: "Invalid or missing problemIds"
            })
        }

        // Create records for each problem in the playlist 
        const problemsInPlaylist = await db.problemsInPlaylist.createMany({
            data : problemIds.map((problemId) => ({
                playlistId: playlistId, // match your prisma field name exactly
                problemId
            }))
        })

        res.status(201).json({
            success: true,
            message: "Problem added to playlist successfully",
            problemsInPlaylist
        })
     } catch (error) {
        console.error("Error adding problems to playlist", error)
        res.status(500).json({error: "Failed to add problems to playlist"})
     }
}

export const deletePlaylist = async(req, res) => {
    const {playlistId} = req.params

    try {
        const deletedPlaylist = await db.playlist.delete({
            where: {
                id: playlistId
            }
        })

        res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
            deletedPlaylist
        })
    } catch (error) {
        console.error("Error deleting playlist:", error)
        res.status(500).json({
            error: "Failed to delete playlist"
        })
    }
}

export const removeProblemFromPlaylist = async(req, res) => {
    const {playlistId} = req.params
    const {problemIds} = req.body

    try {
        if(!Array.isArray(problemIds) || problemIds.length === 0){
            return res.status(400).json({
                error: "Invalid or missing problemId"
            })
        }

        const deletedProblem = await db.problemsInPlaylist.deleteMany({
            where: {
                playlistId,
                problemId:{
                    in: problemIds
                }
            }
        })

        res.status(200).jsop({
            success: true,
            message: "Problem removed from playlist successfully",
            deletedProblem
        })
    } catch (error) {
        console.error("Error removing problem from playlist:", error)
        res.status(500).json({
            error: "Failed to remove problem from playlist"
        })
    }
}