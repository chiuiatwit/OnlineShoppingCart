import React from 'react';
import { Drawer, Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSavedItems } from '../context/SavedItemsContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { items, deleteItem, isOpen, closeSidebar } = useSavedItems();
  const { user } = useAuth();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeSidebar}
      PaperProps={{
        sx: {
          width: 360,
          maxWidth: '100%',
          background: 'linear-gradient(180deg, rgba(17,24,39,0.98), rgba(15,23,42,0.96))',
          borderLeft: '1px solid rgba(148, 163, 184, 0.16)',
          boxShadow: '-18px 0 50px rgba(0,0,0,0.45)',
          color: '#f8fafc',
          backdropFilter: 'blur(18px)',
        },
      }}
    >
      <Box
        sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}
        role="complementary"
        aria-label="Saved comparisons"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={800}>
            Saved Comparisons
          </Typography>

          <button
            onClick={closeSidebar}
            style={{
              background: 'rgba(148, 163, 184, 0.08)',
              border: '1px solid rgba(148, 163, 184, 0.14)',
              borderRadius: '999px',
              width: 34,
              height: 34,
              fontSize: '1rem',
              cursor: 'pointer',
              lineHeight: 1,
              color: '#cbd5e1',
            }}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </Box>

        <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.16)' }} />

        <Box sx={{ flex: 1, overflowY: 'auto', mt: 2 }}>
          {!user ? (
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Sign in to save products for comparison.
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                onClick={closeSidebar}
                sx={{
                  px: 2.5,
                  py: 1.1,
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #2563eb, #3b82f6 58%, #22d3ee)',
                  boxShadow: '0 0 0 1px rgba(96,165,250,0.2), 0 0 28px rgba(59,130,246,0.18)',
                }}
              >
                Sign in
              </Button>
            </Box>
          ) : items.length === 0 ? (
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                No saved items yet.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Search for a product and hit "Save" to compare prices here.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2,
                    border: '1px solid rgba(148, 163, 184, 0.16)',
                    borderRadius: 2.5,
                    background: 'rgba(15, 23, 42, 0.78)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ color: '#f8fafc' }}>
                      {item.name}
                    </Typography>

                    {item.price && (
                      <Typography
                        variant="body2"
                        sx={{ color: '#93c5fd', mt: 0.5, fontWeight: 700 }}
                      >
                        {item.price}
                      </Typography>
                    )}

                    {item.url && (
                      <Typography
                        component="a"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.75,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          '&:hover': { color: '#fff' },
                        }}
                      >
                        View product ↗
                      </Typography>
                    )}
                  </Box>
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
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
