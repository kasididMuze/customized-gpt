export const stringConverter = (anyString: string) => {
  if (typeof anyString !== 'string') {
    throw new Error('Invalid input type')
  }
  const concatString = `${anyString}-with-suffix`
  return concatString

}