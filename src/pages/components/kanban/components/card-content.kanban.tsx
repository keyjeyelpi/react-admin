import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import { cloneElement, memo, useState } from 'react';
import { useIcon } from '@/features/icon.feature';
import parse from 'html-react-parser';
import moment from 'moment-timezone';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { TbHeart, TbLayersSelected, TbLock, TbMessage2 } from 'react-icons/tb';
import type { KanbanCardCommentProps, KanbanCardContentProps } from '../types';

const KanbanCardComment = ({ comment }: KanbanCardCommentProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Stack flexDirection="row" gap={1} alignItems="flex-start" mb={collapsed ? 0 : 2}>
      <Avatar
        src={comment?.avatar}
        alt={comment?.author}
        sx={{
          width: 24,
          height: 24,
        }}
      />
      <Box
        sx={{
          pl: 1,
          borderColor: 'divider',
        }}
      >
        <Stack
          sx={{
            bgcolor: 'background.50',
            p: 1.5,
            borderRadius: 4,
            borderTopLeftRadius: 0,
          }}
        >
          <Stack flexDirection="row" gap={0.5} alignItems="center">
            <Typography variant="subtitle2" fontWeight={600}>
              {comment?.author}
            </Typography>
            🞗
            <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
              {moment(comment?.date).fromNow()}
            </Typography>
          </Stack>
          <Typography variant="subtitle2">{comment?.text}</Typography>
        </Stack>
        {collapsed && !!comment?.replies?.length && (
          <Button size="small" onClick={() => setCollapsed(false)}>
            • Show {comment.replies?.length || 0} Replies
          </Button>
        )}
        <Collapse in={!collapsed} unmountOnExit>
          <Stack
            gap={2}
            sx={{
              mt: 1,
            }}
          >
            {comment.replies?.map((reply, i) => (
              <Stack flexDirection="row" key={i}>
                <Box
                  component={motion.div}
                  animate={{
                    y: -54,
                    x: -30,
                  }}
                  sx={{
                    position: 'absolute',
                    width: 32,
                    height: 66,
                    borderBottomLeftRadius: i !== (comment?.replies?.length || 0) - 1 ? 0 : 6,
                    borderLeft: '2px solid',
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                  }}
                />
                <Stack flexDirection="row" gap={2} ml={1} alignItems="flex-start" height={50}>
                  <Avatar
                    src={reply?.avatar}
                    alt={reply?.author}
                    sx={{
                      width: 24,
                      height: 24,
                    }}
                  />
                  <Stack
                    sx={{
                      bgcolor: 'background.50',
                      p: 1,
                      borderRadius: 4,
                      borderTopLeftRadius: 0,
                    }}
                  >
                    <Stack flexDirection="row" gap={0.5} alignItems="center">
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          fontSize: '0.75rem',
                          color: 'text.secondary',
                        }}
                      >
                        {reply?.author}
                      </Typography>
                      🞗
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.75rem',
                          color: 'text.secondary',
                        }}
                      >
                        {moment(reply?.date).fromNow()}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      {reply?.text}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Collapse>
      </Box>
    </Stack>
  );
};

const KanbanCardContent = ({
  id,
  isLocked,
  category,
  title,
  description,
  likes,
  comments,
  selected,
  setSelected,
}: KanbanCardContentProps) => {
  const getIconByName = useIcon();

  return (
    <Stack justifyContent="space-between" alignItems="stretch" data-card-id={id}>
      <Stack
        gap={1}
        sx={{
          p: 2,
        }}
      >
        {category && (
          <Stack direction="row" justifyContent="flex-start" gap={1} alignItems="center">
            <Stack
              component={motion.div}
              layoutId={(id || '') + 'icon' + (category?.label || '') + (title || '')}
              justifyContent="center"
              alignItems="center"
              sx={{
                color: 'primary.main',
              }}
            >
              {!!category?.icon &&
                cloneElement(getIconByName(category?.icon) || <TbLayersSelected />, {
                  size: 22,
                })}
            </Stack>
            <Typography
              component={motion.span}
              layoutId={(id || '') + category?.label}
              variant="caption"
            >
              {category?.label || 'Category'}
            </Typography>
          </Stack>
        )}
        {isLocked && (
          <Alert severity="error" component={motion.div} icon={<TbLock />}>
            The item cannot be edited.
          </Alert>
        )}
        <Typography fontWeight={600} component={motion.div} layoutId={(id || '') + title}>
          {title || 'Task Title'}
        </Typography>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box
            component={motion.div}
            initial={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 64,
            }}
            animate={{
              height: selected ? 0 : 64,
            }}
            sx={{
              background: (theme) =>
                `linear-gradient(to top, ${theme.palette.background.paper} 0%, ${chroma(
                  theme.palette.background.paper,
                )
                  .alpha(0)
                  .hex()} 100%)`,
              zIndex: 1,
            }}
          />
          <Collapse in={!!selected && !!description} collapsedSize={64}>
            {!!description && (
              <Typography
                variant="body2"
                component={motion.div}
                layoutId={(id || '') + description}
              >
                {parse(description) || 'Lorem Ipsum'}
              </Typography>
            )}
          </Collapse>
          <Collapse
            in={!!selected}
            sx={{
              mt: 2,
            }}
            unmountOnExit
          >
            <>
              <Tabs>
                <Tab label="Comments" />
                <Tab label="Likes" />
              </Tabs>
              <Divider />
              <Collapse
                in={comments && comments.length > 0}
                sx={{
                  mt: 2,
                }}
              >
                <Stack gap={1}>
                  {comments?.map((comment, index) => (
                    <KanbanCardComment key={index} comment={comment} />
                  ))}
                </Stack>
              </Collapse>
            </>
          </Collapse>
        </Box>
      </Stack>
      <Box>
        <Divider />
        <Collapse in={!selected}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              p: 1,
            }}
          >
            <Stack direction="row">
              <Button size="small" startIcon={<TbHeart />}>
                {likes}
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  mx: 1,
                }}
              />
              <Button size="small" startIcon={<TbMessage2 />}>
                {comments?.reduce(
                  (acc, curr) => acc + 1 + (curr.replies ? curr.replies.length : 0),
                  0,
                )}
              </Button>
            </Stack>
            {!selected && (
              <Button
                size="small"
                sx={{
                  backgroundColor: 'primary.100',
                  color: 'primary.main',
                  px: 1,
                }}
                onClick={setSelected}
              >
                Show More
              </Button>
            )}
          </Stack>
        </Collapse>
      </Box>
    </Stack>
  );
};

export default memo(KanbanCardContent);
