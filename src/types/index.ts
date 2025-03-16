export interface Collection {
    id: string;
    name: string;
    artist: string;
    type: CollectionType;
    songCount: number;
    durationInSeconds: number;
    sizeInBytes: number;
    releasedOn: string;
  }
  
  export interface CollectionDetails extends Collection {
    songs: Song[];
    totalSize: number; 
    totalDuration: number;
  }
  
  export interface Song {
    title: string;
    durationInSeconds: number;
    sizeInBytes: number;
    performers: string[];
  }
  
  export type CollectionType = "EP" | "Album" | "Single";