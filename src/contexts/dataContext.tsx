import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Data {
  id: number;
  name: string;
  year: number;
  tracks: any;
}
interface DataProviderProps {
  children: ReactNode;
}

 const initialState = {
  data: [],
  getAlbums: () => [],
  deleteAlbum: () => [],
  deleteTrack: () => [],
  convertSecondsInMinutes: () => [],
  handleCreateNewAlbum: () => []
};

interface DataContextProps {
  data: Data[];
  getAlbums: () => void;
  deleteAlbum: (id: number) => void;
  deleteTrack: (id: number) => void;
  convertSecondsInMinutes: (value: number) => void;
}

export const DataContext = createContext<DataContextProps>(initialState);

export function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<Data[]>([]);
  function getAlbums() {
    api.get('album').then(response => {
      const dados = response.data.data;
      setData(dados);
    });
  }
  function deleteAlbum(id: number) {
    api.delete(`album/${id}`).then(() => getAlbums());
  }
  function deleteTrack(id: number) {
    api.delete(`track/${id}`).then(() => getAlbums());
  }
  function convertSecondsInMinutes(value: number): string {
    const minutes = value / 60;
    const formattedMin = minutes.toFixed(2).toString().replace('.', ':');
    return formattedMin;
  }

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        getAlbums,
        deleteAlbum,
        deleteTrack,
        convertSecondsInMinutes
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
