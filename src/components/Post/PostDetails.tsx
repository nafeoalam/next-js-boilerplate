import { useUpdatePostByIdMutation } from '@/redux/services/example'
import { useGetPostByIdQuery } from '@/redux/services/example/post'
import { Box, Button, CircularProgress, Typography } from '@mui/material'

type Props = {
  // post: Post | null
  selectedPostId?: number
}

const PostDetails = ({ selectedPostId }: Props) => {
  const {
    isLoading: isPostLoading,
    data: post,
    error: postError,
    isFetching: isPostFetching,
  } = useGetPostByIdQuery(selectedPostId, { skip: !selectedPostId })

  const [
    updatePost,
    { isLoading: isPostUpdating, isSuccess: postUpdated, error: updateError },
  ] = useUpdatePostByIdMutation()

  const _updatePost = (id: number) => {
    if (!selectedPostId) return
    updatePost({
      id,
      // title: 'Updated title',
      body: 'Updated body Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, vel harum libero officia maxime ad eum in tempora quod eius ',
    })
  }
  return (
    <Box p={2}>
      <Box display='flex'>
        <Typography component='h4' variant='h4'>
          {post?.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isPostUpdating || isPostFetching ? (
            <CircularProgress sx={{ ml: 2 }} />
          ) : (
            <Button
              variant='contained'
              onClick={() => _updatePost(post.id)}
              sx={{ ml: 2 }}>
              Test Update
            </Button>
          )}
        </Box>
      </Box>
      <Typography component='p' variant='body1'>
        {post?.body}
      </Typography>
    </Box>
  )
}

export default PostDetails
