import { useRouteModal } from '@/hooks/route-modal.hook';
import { Button, TextField, Stack } from '@mui/material';
import Modal, { ModalTrigger, ModalContent } from '@/components/button-modal.component';
import { TbCirclePlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

const KanbanAddColumn = ({ addColumn }: { addColumn: (name: string) => void }) => {
  const [show, setShow] = useRouteModal('add-column', '/components/kanban');
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    addColumn(data.name);
    setShow(false);
  };

  return (
    <Modal show={show} setShow={setShow}>
      <ModalTrigger>
        <Button startIcon={<TbCirclePlus />} onClick={() => navigate('add-column')}>
          Add Column
        </Button>
      </ModalTrigger>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Column name is required',
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Column Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Button type="submit" variant="contained" fullWidth>
              Add Column
            </Button>
          </Stack>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default KanbanAddColumn;
