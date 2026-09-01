import z from "zod";

export const findByEmailRequestSchema = z.email();
