import { useRouteModal } from '@/hooks/route-modal.hook';
import { Modal, Box, IconButton } from '@mui/material';
import { TbCirclePlus } from 'react-icons/tb';

const KanbanAddCard = () => {
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
