import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  bgcolor: 'background.paper',
  boxShadow: 27,
  p: 4,
  borderColor: 'none',
  borderRadius: '4px',
  '::focus:': {
    borderColor: 'none',
    outline: 'none',
  },
}

type Props = {
  children: React.ReactNode
  open: boolean
  handleClose: () => void
}

const DefaultModal = ({ open, children, handleClose }: Props) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      disableAutoFocus
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  )
}
export default DefaultModal
