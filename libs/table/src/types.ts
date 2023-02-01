export type Column<T extends object> = {
  accessor: keyof T & string
  label: string
  format?: (val: boolean) => void
}

export type Filters<T extends object> = Partial<Record<keyof T, string>>
