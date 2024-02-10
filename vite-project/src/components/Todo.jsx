// components/Todo.js
import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Todo = () => {
  const [todos, setTodos] = useState([
    { text: '할 일 1', isDone: false, id: 1 },
    { text: '할 일 2', isDone: true, id: 2 }
  ]);

  // FB data 기져오는 로직
  useEffect(() => {
    const fetchData = async () => {
      // posts라는 이름으로 되어있는 컬렉션의 쿼리값 가져옴
      // 쿼리값을 토대로 가져온 다큐먼트들을 '쿼리스냅샷'으로 담음
      // getDocs 메서드를 통해 collection에 있는 모든 다큐먼트 가져옴
      const querySnapshot = await getDocs(collection(db, 'posts'));

      // 최초 게시물을 배열로 선언
      const initialPosts = [];

      // doc에 메타 데이터까지 들어가있기 때문에 실제 데이터는 doc.data로 가져올 수 있음
      // querySnapshot에 들어가있는 모든 doc에 대해서 initialPosts값을 추가한 다음,
      // initialPosts를 setPosts를 통해서 값을 넣어줌
      querySnapshot.forEach((doc) => {
        // doc에 id값을 추가해서 posts 추가
        const data = {
          id: doc.id,
          ...doc.data()
        };
        console.log('data', data);
        initialPosts.push(data);
      });
      setTodos(initialPosts);
    };
    fetchData();
  }, []);

  const [text, setText] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'text') {
      setText(value);
    }
  };

  // addDoc으로 데이터 추가
  // async - await 공부하기
  const addTodo = async (event) => {
    event.preventDefault();
    const newTodo = { text: text, isDone: false };

    // 상턔 업데이트 로직
    setTodos((prevD) => [...todos, newTodo]);
    setText('');

    // Firestore에 데이터 추가
    // 어느 collection의 문서를 가져올지 지정, 2번째 인자로 어떤 값을 추가할지 지정
    // 코드를 작성할 때 비동기 함수를 사용하는 경우, 항상 try...catch 블록을 사용하여 예외 처리를 해주는 것이 좋음
    try {
      const docRef = await addDoc(collection(db, 'posts'), newTodo);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h2>할 일 컴포넌트</h2>
      <form>
        <div>
          <label>할 일 : </label>
          <input type="text" value={text} name="text" onChange={onChange} required></input>
          <button onClick={addTodo}>추가</button>
        </div>
      </form>
      <h3>Working</h3>
      {todos
        .filter((todo) => !todo.isDone)
        .map((todo) => {
          return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
        })}
      <h3>Done</h3>
      {todos
        .filter((todo) => todo.isDone)
        .map((todo) => {
          return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
        })}
    </div>
  );
};

export default Todo;
