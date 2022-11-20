export const setElementBackground = (
  e: HTMLElement | HTMLFormElement,
  color: string
) => {
  return (e.style.background = color);
};
