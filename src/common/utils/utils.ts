export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function assertExhaustive(_x: never): never {
  throw new Error("Unexpected exhaustive check");
}
