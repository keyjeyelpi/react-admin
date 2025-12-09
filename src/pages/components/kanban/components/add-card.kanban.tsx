import { useRouteModal } from '@/hooks/route-modal.hook';
import { Modal, Box, IconButton } from '@mui/material';
import { TbCirclePlus } from 'react-icons/tb';

const KanbanAddCard = () => {
  const [show] = useRouteModal('create');

  return (
    <>
      <IconButton>
        <TbCirclePlus />
      </IconButton>
      <Modal open={!!show}>
        <Box></Box>
      </Modal>
    </>
  );
};

export default KanbanAddCard;
