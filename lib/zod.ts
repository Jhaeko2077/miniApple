import { z } from "zod";

export const emailSchema = z.string().email().toLowerCase();
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters");
