export default function debounce (fn, interval) {
  let timer;
  return function debounced (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => (fn(...args)), interval);
  }
}
