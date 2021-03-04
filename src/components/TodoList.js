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
    /* AutoSizer는 부모요소의 width height을 List에 전달해줍니다.
    최상단 div로 감싸지 않는다면, AutoSizer가 가리키는 부모요소는
    TodoInsert와 TodoList 2개를 자식요소로 가지게 되고,
    TodoList가 부모요소의 높이를 상속받는다고 했으니
    부모요소 높이 = TodoList에 전해준 자신의 높이+ TodoInsert의 높이가 되어
    높이 초과가 발생하게 됩니다. */

    /* 그리고, AutoSizer 부모 요소에 flex를 사용하고 싶다면,
    그 부모요소의 부모요소 또한 flex를 사용하여 이중 flex로 감싸야 합니다.
    공식문서에서 해당 문제에 대한 정확한 언급은 없었습니다. */

    <div className="TodoList-wrap">
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
    </div>
  );
};

export default React.memo(TodoList);
