export function getNextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1
}
