export const isBrowser = () => typeof window !== 'undefined';

export const addSpacesEvery3Chars = (input: string, startIndex = 0): string => {
  const chunkSize = 3;

  if (startIndex >= input.length) {
    return '';
  }

  const chunk = input.slice(startIndex, startIndex + chunkSize);
  const remainingFormatted = addSpacesEvery3Chars(input, startIndex + chunkSize);

  return chunk + (remainingFormatted === '' ? '' : ' ' + remainingFormatted);
};
