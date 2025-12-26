import { TbPlus } from 'react-icons/tb';
import { v4 as uuid } from 'uuid';
import {
  IconButton,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Modal, { ModalTrigger, ModalContent } from '@/components/button-modal.component';
import { useState, useMemo } from 'react';
import kanbanData from '@/data/kanban.data.json';
import type { Column } from '../types';

interface KanbanAddCardProps {
  card: Column;
  setCards: React.Dispatch<React.SetStateAction<Column[]>>;
}

const KanbanAddCard = ({ card, setCards }: KanbanAddCardProps) => {
  const [show, setShow] = useState(false);
  const { control, handleSubmit, reset } = useForm();

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();

    for (const column of kanbanData as any[]) {
      for (const item of column.items) {
        const cat = item.content.category;
        map.set(cat.label, cat.icon);
      }
    }

    return map;
  }, []);

  const categories = Array.from(categoryMap.keys());

  const onSubmit = (data: any) => {
    const icon = categoryMap.get(data.category) || '';

    setCards((prev) =>
      prev.map((col) =>
        col.id === card.id
          ? {
              ...col,
              items: [
                ...col.items,
                {
                  id: uuid(),
                  content: {
                    title: data.title,
                    description: data.description,
                    category: {
                      color: 'primary.main',
                      label: data.category,
                      icon,
                    },
                  },
                },
              ],
            }
          : col,
      ),
    );
    reset();
    setShow(false);
  };

  return (
    <Modal id={`add-card-${card.id}`} show={show} setShow={setShow}>
      <ModalTrigger>
        <IconButton
          onClick={() => setShow(true)}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
          size="small"
        >
          <TbPlus />
        </IconButton>
      </ModalTrigger>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: 'Title is required',
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Card Title"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Description" fullWidth multiline rows={4} />
              )}
            />
            <Controller
              name="category"
              control={control}
              rules={{
                required: 'Category is required',
              }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    {...field}
                    label="Category"
                    labelId="category-label"
                    displayEmpty
                    renderValue={(selected) => selected || 'Category'}
                  >
                    {categories.map((label) => (
                      <MenuItem key={label} value={label}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Button type="submit" variant="contained" fullWidth>
              Add Card
            </Button>
          </Stack>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default KanbanAddCard;
