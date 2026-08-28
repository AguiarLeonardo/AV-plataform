import es from "./es";
import en from "./en";

export const dictionaries = { es, en };

export type Locale = keyof typeof dictionaries;
