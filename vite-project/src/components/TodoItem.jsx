// components/TodoItem.js
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// updateDoc을 사용하여 게시글 수정
const TodoItem = ({ todo, setTodos }) => {
  const updateTodo = async (event) => {
    try {
      // 코드를 collection작성할 때 비동기 함수를 사용하는 경우, 항상 try...catch 블록을 사용하여 예외 처리를 해주는 것이 좋음
      // collection 안에 있는 document의 값을 업데이트 해줘야 됨

      const postRef = doc(db, 'posts', todo.id);
      await updateDoc(postRef, { ...todo, isDone: !todo.isDone });

      setTodos((prev) =>
        prev.map((element) => (element.id === todo.id ? { ...element, isDone: !element.isDone } : element))
      );
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  //deleteeDoc을 사용하여 게시글 삭제
  const deleteTodo = async (event) => {
    const postRef = doc(db, 'posts', todo.id);
    await deleteDoc(postRef);
    setTodos((prev) => prev.filter((element) => element.id !== todo.id));
  };

  return (
    <div key={todo.id}>
      <span>{todo.text}</span>
      <button onClick={updateTodo}>{todo.isDone ? '취소' : '완료'}</button>
      <button onClick={deleteTodo}>삭제</button>
    </div>
  );
};

export default TodoItem;
