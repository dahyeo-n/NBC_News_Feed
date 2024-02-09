import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firesbase';

function Main() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);

      let initialTodos = [];

      querySnapshot.forEach((doc) => {
        initialTodos.push({ id: doc.id, ...doc.data() });
      });
      setData(initialTodos);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Link to="/loginpage">로그인</Link>
      </div>
      <div>
        <Link to="/joinpage">회원가입</Link>
      </div>
      {data !== null &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <div>닉네임:{item.nickName} </div>
              <div>회원가입:{item.join.toString()}</div>
              {console.log(item.id)}
            </div>
          );
        })}
    </div>
  );
}

export default Main;
