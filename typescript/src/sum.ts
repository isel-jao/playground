export function sum(...args: number[]): number {
  return args.reduce((acc, curr) => acc + curr, 0);
}
