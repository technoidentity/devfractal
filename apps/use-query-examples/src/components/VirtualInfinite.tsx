import { Checkbox, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import invariant from 'tiny-invariant'
import { useInfiniteTodos } from './hooks'

const useTodoList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteTodos()

  const todoList = React.useMemo(
    () => data?.pages.flatMap(page => page.data),
    [data],
  )

  const itemCount = React.useMemo(
    () => data?.pages[0].itemCount || 10,
    [data?.pages],
  )

  const loadMoreItems = React.useCallback(() => {
    if (isFetchingNextPage) {
      return
    }

    fetchNextPage().catch(err => console.error(err))
  }, [fetchNextPage, isFetchingNextPage])

  const isItemLoaded = (index: number) =>
    todoList !== undefined && index < todoList.length

  return {
    todoList,
    hasNextPage,
    itemCount,
    loadMoreItems,
    isItemLoaded,
  }
}

const TodoItem = ({ data: todoList, index, style }: any) =>
  todoList === undefined ? null : index < todoList.length ? (
    <div style={style}>
      <HStack p={1}>
        <Checkbox isChecked={todoList[index].completed} />
        <Text>{todoList[index].id}</Text>
        <Text p="2">{todoList[index].title}</Text>
      </HStack>
    </div>
  ) : (
    <div style={style}>loading...</div>
  )

export const TodoList = () => {
  const { todoList, isItemLoaded, itemCount, loadMoreItems } = useTodoList()

  invariant(todoList !== undefined, 'todolist is undefined')

  return (
    <Flex w="100%" h="100vh" p="5">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                itemData={todoList}
                itemCount={itemCount}
                onItemsRendered={onItemsRendered}
                ref={ref}
                itemSize={40}
                width={width}
                height={height}
              >
                {TodoItem}
              </FixedSizeList>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </Flex>
  )
}
