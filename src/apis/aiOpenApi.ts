import axios from 'axios';
import baseApi from './baseApi';

export const helpChatBot = async (prompt: string) => {
  try {
    const response = await baseApi.post('/ai/chat/chat', {
      prompt: prompt
    });
    return response.data; 
  } catch (error) {
    console.error('Error calling chat API:', error);
    throw error;
  }
};