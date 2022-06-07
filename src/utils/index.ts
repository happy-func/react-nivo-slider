export function clsx(list: (string | undefined)[]): string {
  return list.filter((item) => !!item).join(` `);
}
