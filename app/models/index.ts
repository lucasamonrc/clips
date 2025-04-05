import { z } from "zod";
export interface User {
  id: number;
  email: string;
}

export const userSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export interface Clip {
  id: number;
  title: string;
  description: string;
  tags: string[];
  createdAt: number;
}
