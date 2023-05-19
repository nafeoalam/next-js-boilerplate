import { useDeletePostByIdMutation } from '@/redux/services/example'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { useState } from 'react'

type Props = {
  id: number
  title: string
  body: string
  onPostClick: (id: number) => void
}

const PostItem = ({ id, body, title, onPostClick }: Props) => {
  const [deletePost] = useDeletePostByIdMutation()

  const [loading, setLoading] = useState(false)

  const _deletePost = async (event: React.SyntheticEvent, id: number) => {
    event.stopPropagation()
    if (!id) return
    setLoading(true)
    await deletePost(id)
    setLoading(false)
  }
  const _onPostClick = () => {
    onPostClick(id)
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
    <Paper
      component='li'
      key={id}
      elevation={26}
      sx={{ p: 2, listStyle: 'none', mb: 2, cursor: 'pointer' }}
      onClick={_onPostClick}>
      <Box display={'flex'} gap={2} mb={2}>
        <Typography component='h3' variant='h6'>
          {title}
        </Typography>
        <Button
          variant='contained'
          onClick={(event) => _deletePost(event, id)}
          disabled={loading}
          size='small'>
          {loading ? 'Deleting' : 'Test Delete'}
          {loading && loader}
        </Button>
      </Box>
      <Typography component='p' variant='body1'>
        {body}
      </Typography>
    </Paper>
  )
}

export default PostItem
