import { publicFileExists } from "./fileExists";

/** Comprueba en build-time si un PDF bajo public/documentos/catalogos/ existe. */
export function catalogPdfExists(filename: string): boolean {
  return publicFileExists("documentos", "catalogos", filename);
}
