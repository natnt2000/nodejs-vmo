import Post from '../models/Post.js'

const getAll = async (req, res) => {
    const page = Number(req.query.page) - 1 || 0
    const limit = Number(req.query.limit) || 5
    const search = req.query.search || /\S/
    try {
            
        // { $text: { $search: search } }
        const partialTextSearchCondition = { 
            $or: [
                {title: {$regex: search, $options: 'i'}},
                {description: {$regex: search, $options: 'i'}}
            ]
        }

        const posts = await Post.find(partialTextSearchCondition).sort({ createdAt: -1 }).skip(page * limit).limit(limit)
        let countPosts = await Post.countDocuments(partialTextSearchCondition)
        
        res.json({
            totalPosts: countPosts, 
            currentPage: page + 1,
            totalPages: Math.ceil(countPosts / limit),
            postsPerPage: posts.length,
            posts
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

export { getAll }