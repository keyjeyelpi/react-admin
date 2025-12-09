import { useRouteModal } from '@/hooks/route-modal.hook';
import { Modal, Box, Button, IconButton } from '@mui/material';
import { TbCirclePlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const KanbanAddCard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useRouteModal('create');

  return (
    <>
      <IconButton>
        <TbCirclePlus />
      </IconButton>
      <Modal open={!!show} onClose={() => setShow(false)}>
        <Box></Box>
      </Modal>
    </>
  );
};

export default KanbanAddCard;
