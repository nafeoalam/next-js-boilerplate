import posts from '@/pages/api/mock/data'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  const { id } = req.query
  if (req.method === 'GET') {
    try {
      const post = posts.find((post) => post.id === Number(id))
      if (post) return res.status(200).json(post)
      return res.status(404).end(`Post ${id} Not Found`)
    } catch (error) {
      console.log(error)
      return res.status(500).end(`Server error`)
    }
  } else if (req.method === 'PATCH') {
    try {
      const post = posts.find((post) => post.id === Number(id))
      if (post) {
        const { title, body } = req.body
        post.title = title || post.title
        post.body = body || post.body
        return res.status(200).json(post)
      } else {
        return res.status(404).end(`Post ${id} Not Found`)
      }
    } catch (error) {
      return res.status(500).end(`Server error`)
    }
  } else if (req.method === 'DELETE') {
    try {
      const post = posts.find((post) => post.id === Number(id))
      if (post) {
        posts.splice(posts.indexOf(post), 1)
        return res.status(200).json(post)
      }
      return res.status(404).end(`Post ${id} Not Found`)
    } catch (error) {
      return res.status(500).end(`Server error`)
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
