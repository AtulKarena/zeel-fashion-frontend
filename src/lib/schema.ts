import { z } from 'zod';
// import { File } from 'fetch-blob/file.js';

export const passwordSchema = z
  .string()
  .nonempty('Password is required')
  .min(3, `Password must be at least 3 characters`)
  .max(32, 'Password must be at most 32 characters');

export const commonPaginationSchema = z.object({
  page: z.coerce
    .number()
    .positive('Must be a positive number and greater than 0.')
    .int()
    .min(1)
    .default(1),
  limit: z.coerce
    .number()
    .positive('Must be a positive number and greater than 0.')
    .int()
    .min(1)
    .max(100)
    .default(10),
  search: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type SortOrder = z.infer<typeof commonPaginationSchema>['order'];

export const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 2 * 1024 * 1024, 'Image size must be less than 2MB')
  .refine(
    (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    'Image must be in JPEG, PNG, or WEBP format',
  );
