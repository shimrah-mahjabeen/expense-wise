import React from 'react'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/system'
import { Avatar, Button, TextField, Typography } from '@mui/material'

import useStyles from './SheetModal.styles'
import logo from '../../../assets/logo.png'

interface Props {
  isOpen: boolean
  title: string
  button: string
  name: string
  description: string
  onClose: () => void
}

const SheetModal = (props: Props) => {
  const { isOpen, title, button, name, description, onClose } = props
  const classes = useStyles()

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className={classes.modal}
        sx={{
          width: {
            lg: 420,
            md: 400,
            sm: 320,
            xs: 300,
          },
        }}
      >
        <Box className={classes.box}>
          <Avatar className={classes.avatar} src={logo} alt="wolfPack" />
          <Typography
            sx={{ marginTop: 5 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {title}
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            className={classes.textfield}
            margin="normal"
            required
            fullWidth
            id="name"
            label={name ? null : 'Name'}
            value={name}
            name="name"
          />
          <TextField
            className={classes.textfield}
            multiline
            margin="normal"
            required
            fullWidth
            name="descrption"
            label={description ? null : 'Description'}
            value={description}
            id="description"
          />
          <Box textAlign="center">
            <Button variant="contained" sx={{ mt: 5 }}>
              {button}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default SheetModal
