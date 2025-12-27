export enum UserRole {
  GUEST = "GUEST",
  AUTH = "AUTH",
}

export interface UserState {
  role: UserRole;
  usageCount: number;
  email?: string;
  maxUsage: number;
}

export interface ModelTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "image" | "text" | "audio" | "pro";
}

export type ImageSize = "1K" | "2K" | "4K";
