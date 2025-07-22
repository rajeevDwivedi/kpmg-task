import React from 'react';
import AssistantIcon from '@mui/icons-material/SmartToy';
import UserIcon from '@mui/icons-material/Person';
import { Box, ListItemIcon, Typography } from '@mui/material';
import type { Chat } from '../types/chat';

function ChatList({isAssistant, chatObj, role}: {isAssistant: boolean, chatObj: Chat, role: string}) {
  return (
    <Box
      key={chatObj.id}
      sx={{
        display: 'flex',
        mb: 2,
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          borderRadius: isAssistant ? '0 8px 8px 8px' : '8px 0 8px 8px',
          width: '100%'
        }}
      >
        <ListItemIcon
          sx={{
          }}
        >
          {isAssistant ? <AssistantIcon /> : <UserIcon />}
        </ListItemIcon>
        <Box>
          <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 0.5, fontWeight: chatObj.role === 'user' ? 'bold' : 'normal', }}>
            {role}
          </Typography>
          {
            chatObj.data.map(chat => {
              const delta = chat.choices[0]?.delta || {};

              return (
                <React.Fragment key={chat.created}>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {delta.content}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Created at: {delta.role === 'user' ? new Date(chat.created).toLocaleString() : new Date(chat.created * 1000).toLocaleString()}
                  </Typography>
                </React.Fragment>
              );
            })
          }
        </Box>
      </Box>
    </Box>
  )
}

export default ChatList;
