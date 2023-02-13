export const argumentResolver = (
  args: string[],
  option: string,
  defaultValue?: string) => {
  const index = args.indexOf(option)
  if (index > -1) {
    const value = args[index+1]
    return value || defaultValue
  }
  return
}