import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import { setCurrentEvent, deleteEvent } from '../store/eventSlice';
import { eventAPI } from '../services/api';
import socketService from '../services/socket';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent } = useSelector((state) => state.events);
  const { user, isGuest } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewers, setViewers] = useState(0);

  const isCreator = currentEvent?.creator?._id === user?.id;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await eventAPI.getEvent(id);
        dispatch(setCurrentEvent(data));
        if (data.currentViewers) {
          setViewers(data.currentViewers);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setError(error.response?.data?.message || 'Failed to fetch event details');
        dispatch(setCurrentEvent(null));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
      
      socketService.joinEvent(id);

      const handleEventUpdate = (updatedEvent) => {
        console.log('Received event update:', updatedEvent);
        if (updatedEvent._id === id) {
          dispatch(setCurrentEvent(updatedEvent));
          if (updatedEvent.currentViewers) {
            setViewers(updatedEvent.currentViewers);
          }
        }
      };

      const handleViewerUpdate = (data) => {
        if (data.eventId === id) {
          setViewers(data.viewers);
        }
      };

      socketService.socket?.on('eventUpdated', handleEventUpdate);
      socketService.socket?.on('viewerUpdate', handleViewerUpdate);

      return () => {
        socketService.leaveEvent(id);
        socketService.socket?.off('eventUpdated', handleEventUpdate);
        socketService.socket?.off('viewerUpdate', handleViewerUpdate);
        dispatch(setCurrentEvent(null));
      };
    }
  }, [id, dispatch]);

  const handleDeleteEvent = async () => {
    try {
      await eventAPI.deleteEvent(id);
      dispatch(deleteEvent(id));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete event');
    }
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!currentEvent) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Event not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {currentEvent.imageUrl && (
          <Box sx={{ mb: 3 }}>
            <img
              src={currentEvent.imageUrl}
              alt={currentEvent.title}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
          </Box>
        )}

        <Typography variant="h3" gutterBottom>
          {currentEvent.title}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Date: {new Date(currentEvent.date).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Location: {currentEvent.location}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Category: {currentEvent.category}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`${viewers} Viewing Now`}
                color="primary"
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body1" paragraph>
          {currentEvent.description}
        </Typography>

        {isCreator && (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete Event
            </Button>
          </Box>
        )}

        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteEvent} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default EventDetails; 