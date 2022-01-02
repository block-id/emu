import { History } from 'history';

/**
 * Safely calls history.push() with relative paths regardless of
 * whether the window path ends in a trailing slash.
 * @param history
 * @param path
 */
export default function redirect(history: History, path: string): void {
  const currPath = window.location.pathname;
  let newPath = path;
  if (!currPath.endsWith('/') && newPath.startsWith('..')) {
    newPath = newPath.slice(1);
  }
  history.push(newPath);
}
