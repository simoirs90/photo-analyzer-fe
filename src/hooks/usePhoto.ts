export const usePhoto = () => {

  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

  const getPhotoUrl = (photoId: number | string, userId?: number | string) => {
    return userId !== undefined
      ? `${apiUrl}/photos/${photoId}?userId=${userId}`
      : `${apiUrl}/photos/${photoId}`;
  };

  console.log('getById(): ' + getPhotoUrl);

  return { getPhotoUrl };
};