import React from 'react';
import { Drawer, Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSavedItems } from '../context/SavedItemsContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { items, deleteItem, isOpen, closeSidebar } = useSavedItems();
  const { user } = useAuth();

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeSidebar}>
      <Box
        sx={{ width: 320, height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}
        role="complementary"
        aria-label="Saved comparisons"
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Saved Comparisons
          </Typography>
          <button
            onClick={closeSidebar}
            style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1, color: '#6b7280' }}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </Box>

        <Divider />

        {/* Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', mt: 2 }}>
          {items.length === 0 ? (
              !user ? (
                /* Logged-out: prompt to sign in */
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                  <Typography variant="body1" color="text.secondary" mb={3}>
                    Sign in to save products for comparison.
                  </Typography>
                  <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    onClick={closeSidebar}
                  >
                    Sign in
                  </Button>
                </Box>
              ) : (
                /* Logged-in but no saved items */
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    No saved items yet.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Search for a product and hit "Save" to compare prices here.
                  </Typography>
                </Box>
              )
            ) : (
              /* Saved items list */
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
                    {item.price && (
                      <Typography variant="body2" color="primary" mt={0.5}>{item.price}</Typography>
                    )}
                    {item.url && (
                      <Typography
                        component="a"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        View product ↗
                      </Typography>
                    )}
                  </Box>
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '0.75rem', flexShrink: 0, marginLeft: 8 }}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
