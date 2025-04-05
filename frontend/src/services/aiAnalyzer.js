import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const analyzeImage = async (imageFile, description) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('description', description);

    const response = await axios.post(`${API_URL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error(error.response?.data?.error || 'Failed to analyze image');
  }
};

export const getHealthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Error checking health status:', error);
    return { status: 'unhealthy' };
  }
}; 