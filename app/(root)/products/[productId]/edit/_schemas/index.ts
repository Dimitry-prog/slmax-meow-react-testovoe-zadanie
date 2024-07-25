import { fileSchema, imageSchema } from '@/app/(root)/products/_schemas';
import { createProductSchema } from '@/app/(root)/products/create/_schemas';

export const editProductSchema = createProductSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});
