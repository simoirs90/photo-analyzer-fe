export interface User {
  id: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface Photo {
  id: number;
  name: string;
  mimeType: string;
  createdAt: string;
  uploadedAt: string;
  sizeMB: string;
}

export interface PhotoResponse {
  photos: Photo[];
  page: number;
  size: number;
}