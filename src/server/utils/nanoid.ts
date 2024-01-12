import { customAlphabet } from "nanoid";

const NANOID_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const nanoidWithoutDashes = customAlphabet(NANOID_ALPHABET);
