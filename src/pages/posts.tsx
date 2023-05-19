// This page is for RTK query tests

import DefaultModal from '@/components/common/DefaultModal'
import PostDetails from '@/components/Post/PostDetails'
import PostItem from '@/components/Post/PostItem'
import { useGetPostsQuery } from '@/redux/services/example'
import { useCreatePostMutation } from '@/redux/services/example/post'
import { Post } from '@/redux/services/example/post/types'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const Posts = () => {
  const { data: posts, error, isLoading, isFetching } = useGetPostsQuery()
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation()

  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>()

  const handlePostModalOpen = () => setIsPostModalOpen(true)

  const handlePostModalClose = () => {
    setIsPostModalOpen(false)
  }

  const onPostClick = (id: number) => {
    if (!id || !posts) return
    setSelectedPostId(id)
    handlePostModalOpen()
  }

  const _createPost = () => {
    //Create a test post
    const newPost: Partial<Post> & Pick<Post, 'title' | 'body'> = {
      title: 'Test post',
      body: 'Test post Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, earum? Corporis, quo velit. Nostrum porro minima, expedita harum earum sequi!',
    }
    createPost(newPost)
  }

  const loader = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CircularProgress size={20} sx={{ ml: 1 }} />
    </Box>
  )

  return (
    <Container>
      <Typography
        component='h1'
        variant='h1'
        textAlign='center'
        pt={4}
        pb={{ xs: 4, sm: 6, md: 8 }}>
        {' '}
        This page is intended to test RTK Query setup
      </Typography>
      <Box component='section'>
        {isLoading && loader}
        <Box
          component='header'
          aria-labelledby='postList'
          mb={4}
          display='flex'
          alignItems={'center'}
          gap={2}>
          <Typography component='h2' variant='h2' id='postList'>
            Post List
          </Typography>
          <Box height='fit-content'>
            <Button
              variant='contained'
              onClick={_createPost}
              disabled={isCreatingPost}>
              {isCreatingPost
                ? 'Creating a new test post'
                : 'Create a test post'}
              {isCreatingPost && loader}
            </Button>
          </Box>
        </Box>
        <Box component='ul'>
          {(posts || []).map((post) => (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              onPostClick={onPostClick}
            />
          ))}
        </Box>
      </Box>

      <DefaultModal open={isPostModalOpen} handleClose={handlePostModalClose}>
        <PostDetails selectedPostId={selectedPostId} />
      </DefaultModal>
    </Container>
  )
}

export default Posts
