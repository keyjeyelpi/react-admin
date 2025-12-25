import { useRouteModal } from '@/hooks/route-modal.hook';
import { Box, Button } from '@mui/material';
import Modal, { ModalTrigger, ModalContent } from '@/components/button-modal.component';
import { TbCirclePlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const KanbanAddColumn = () => {
  const [show, setShow] = useRouteModal('add-column', '/components/kanban');
  const navigate = useNavigate();

  return (
    <Modal show={show} setShow={setShow}>
      <ModalTrigger>
        <Button startIcon={<TbCirclePlus />} onClick={() => navigate('add-column')}>
          Add Column
        </Button>
      </ModalTrigger>
      <ModalContent>
        
      </ModalContent>
    </Modal>
  );
};

export default KanbanAddColumn;
