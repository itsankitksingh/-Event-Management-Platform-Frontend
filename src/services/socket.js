import io from 'socket.io-client';
import { updateEvent } from '../store/eventSlice';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.store = null;
  }

  connect(store) {
    this.store = store;
    this.socket = io(SOCKET_URL);
    
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('eventUpdated', (event) => {
      console.log('Socket received eventUpdated:', event);
      if (this.store) {
        this.store.dispatch(updateEvent(event));
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  joinEvent(eventId) {
    console.log('Joining event room:', eventId);
    if (this.socket) {
      this.socket.emit('joinEvent', eventId);
    }
  }

  leaveEvent(eventId) {
    console.log('Leaving event room:', eventId);
    if (this.socket) {
      this.socket.emit('leaveEvent', eventId);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService(); 