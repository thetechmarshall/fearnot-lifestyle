import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { reviewType } from "./reviewType";
import order from "./order";
import user from "./user";
import contactMessage from "./contactMessage";
import newsletterSchema from "./newsletter";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, reviewType, order, user, contactMessage, newsletterSchema],
};
