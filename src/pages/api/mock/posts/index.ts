import posts from '@/pages/api/mock/data'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

type PostResponse = Post[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) {
  if (req.method === 'GET') {
    try {
      return res.status(200).json(posts)
    } catch (error) {
      console.log(error)
      return res.status(500).end(`Server error`)
    }
  } else if (req.method === 'POST') {
    try {
      const { title, body } = req.body
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: 1,
        title,
        body,
      }
      posts.unshift(post)
      return res.status(200).json(posts)
    } catch (error) {
      console.log(error)
      return res.status(500).end(`Server error`)
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
