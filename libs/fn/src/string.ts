export function capitalize<T extends string>(str: T): Capitalize<T> {
  return (
    str.length === 0 ? '' : str[0].toUpperCase() + str.slice(1)
  ) as Capitalize<T>
}

export function uncapitalize<T extends string>(str: T): Uncapitalize<T> {
  return (
    str.length === 0 ? '' : str[0].toLowerCase() + str.slice(1)
  ) as Uncapitalize<T>
}

export function lowerCase<T extends string>(str: T): Lowercase<T> {
  return str.toLowerCase() as Lowercase<T>
}

export function upperCase<T extends string>(str: T): Uppercase<T> {
  return str.toUpperCase() as Uppercase<T>
}

export function camelToPascal(str: string): string {
  return str.length === 0 ? '' : str[0].toUpperCase() + str.slice(1)
}

export function pascalToCamel(str: string): string {
  return str.length === 0 ? '' : str[0].toLowerCase() + str.slice(1)
}

export function snakeToCamel(str: string): string {
  if (str.length === 0) {
    return ''
  }
  const [firstWord, ...remWords] = str.split('_')
  return firstWord + remWords.map(capitalize).join('')
}

export function snakeToPascal(str: string): string {
  return str.length === 0 ? '' : str.split('_').map(capitalize).join('')
}

export function camelToSnake(str: string): string {
  return str.length === 0
    ? ''
    : str.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)
}

export function pascalToSnake(str: string): string {
  return str.length === 0
    ? ''
    : str.replace(
        /[A-Z]/g,
        (match, offset) => (offset > 0 ? '_' : '') + match.toLowerCase(),
      )
}
