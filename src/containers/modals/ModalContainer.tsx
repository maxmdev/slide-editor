import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export interface IModalContainerProps {
  id: string;
  title: string;
  children: React.ReactNode | React.ReactNode[];
  isOpened: boolean;
  onClose?: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalContainer: React.FC<IModalContainerProps> = ({
  id,
  title,
  children,
  isOpened,
  onClose,
}) => {
  return (
    <Modal open={isOpened} onClose={onClose}>
      <Box sx={style}>
        <Typography id={`modal-${id}-title`} variant="h6" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalContainer;
