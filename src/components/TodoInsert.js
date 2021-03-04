import React, { useState, useCallback } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert, onReset }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onInsert(value);
      setValue(''); // value 초기화
    },
    [onInsert, value],
  );

  const onResetAll = useCallback(
    (e) => {
      e.preventDefault(); // submit 되는 것을 막기
      onReset();
      setValue(''); // value 초기화
    },
    [onReset],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
      <button type="button" onClick={onResetAll}>
        <MdRefresh />
      </button>
    </form>
  );
};

export default TodoInsert;
