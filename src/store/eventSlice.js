import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEventsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
    },
    fetchEventsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
      const index = state.events.findIndex(e => e._id === action.payload?._id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const updatedEvent = action.payload;
      const index = state.events.findIndex(e => e._id === updatedEvent._id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
      if (state.currentEvent?._id === updatedEvent._id) {
        state.currentEvent = updatedEvent;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event._id !== action.payload);
    },
  },
});

export const {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  setCurrentEvent,
  addEvent,
  updateEvent,
  deleteEvent,
} = eventSlice.actions;

export default eventSlice.reducer; 