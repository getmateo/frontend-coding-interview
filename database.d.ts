export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string;
          username: string | null;
          role: string | null;
        };
        Insert: {
          id?: string;
          username?: string | null;
          role?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          role?: string | null;
        };
      };
    };
    Functions: {};
  };
}
