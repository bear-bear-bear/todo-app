import React, { useCallback } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [todos, onRemove, onToggle],
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="TodoList"
          width={width}
          height={height}
          rowCount={todos.length} // 항목 개수
          rowHeight={57} // 항목 높이
          rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
          list={todos} // 배열
          style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
        />
      )}
    </AutoSizer>
  );
};

export default React.memo(TodoList);
