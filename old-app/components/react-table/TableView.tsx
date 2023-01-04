/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import BaseTable, { Column } from 'react-base-table'

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { fakeUsers, User } from '../../common/fake'
import { insertAt, removeAt } from '../../common/utils'
import { MultiSelect } from './SelectColumns'

// eslint-disable-next-line functional/prefer-readonly-type
export const data = fakeUsers(10) as User[]

export const HeaderCell: React.FC<any> = props => {
  // console.log(props)
  return (
    <Draggable draggableId={props.column.dataKey} index={props.columnIndex}>
      {provided => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          // eslint-disable-next-line @typescript-eslint/unbound-method
          ref={provided.innerRef}
        >
          {props.column.title}
        </div>
      )}
    </Draggable>
  )
}

interface TableViewProps {
  readonly data: readonly any[]
}

export const TableView: React.FC<TableViewProps> = ({ data }) => {
  const [columnNames, setColumnNames] = React.useState<readonly string[]>(
    Object.keys(data[0]),
  )

  const columnList = columnNames.map(col => ({
    title: col,
    key: col,
    dataKey: col,
    width: 400,
  }))

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) {
      return
    }
    const item = columnNames[source.index]
    const remaining = removeAt(columnNames, source.index)
    const newValues = insertAt(remaining, destination.index, item as string)
    setColumnNames(newValues)
  }

  const handleSubmit = (values: readonly string[]) => {
    setColumnNames(values)
  }

  return (
    <>
      <MultiSelect defaultValues={columnNames} onSubmit={handleSubmit} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="helo" direction="horizontal">
          {provided => (
            // eslint-disable-next-line @typescript-eslint/unbound-method
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <BaseTable data={data as any[]} width={600} height={400}>
                {columnList.map(col => (
                  <Column headerRenderer={HeaderCell} {...col} key={col.key} />
                ))}
              </BaseTable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
