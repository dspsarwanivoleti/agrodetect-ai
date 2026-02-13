
export interface PlantScan {
  id: string;
  timestamp: number;
  imageUrl: string;
  plantName: string;
  condition: string;
  isDried: boolean;
  confidence: number;
  advice: string;
  quotation: string;
  careTips: string[]; // New field for specific care instructions
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface AppState {
  user: User | null;
  history: PlantScan[];
  darkMode: boolean;
}
