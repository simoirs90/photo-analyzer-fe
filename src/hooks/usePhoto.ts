export const usePhoto = () => {

  const getPhotoUrl = (photoId: number | string, userId?: number | string) => {
    return userId !== undefined
      ? `http://localhost:8080/photos/${photoId}?userId=${userId}`
      : `http://localhost:8080/photos/${photoId}`;
  };

  console.log('getById(): ' + getPhotoUrl);

  return { getPhotoUrl };
};