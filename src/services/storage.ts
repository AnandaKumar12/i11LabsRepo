export const save = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
}
export const load = (key: string) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}
