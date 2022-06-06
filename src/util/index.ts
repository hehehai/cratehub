export const chunkIntoN = <T>(arr: T[], size: number) => {
  const n = Math.ceil(arr.length / size);
  return Array.from({ length: n }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
