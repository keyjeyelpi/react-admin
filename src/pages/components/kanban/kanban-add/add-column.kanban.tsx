import { useRouteModal } from '@/hooks/route-modal.hook';
import { Button, TextField, Stack, Box } from '@mui/material';
import Modal, { ModalTrigger, ModalContent } from '@/components/button-modal.component';
import { TbCirclePlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Title from '@/components/title.component';

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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Title
              title="Add Column"
              subtitle="Add a column to the kanban board."
              hideBreadcrumbs
            />
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Column name is required',
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Column"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Stack flexDirection="row" justifyContent="flex-end" alignItems="center" gap={1}>
              <Button type="button" variant="outlined" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default KanbanAddColumn;
