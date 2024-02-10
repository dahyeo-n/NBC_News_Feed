import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firesbase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firesbase';

function Main() {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const [currentUserEmail, setCurruntUserEmail] = useState(null);

  //로그인체크
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCheck(true);
        setCurruntUserEmail(user.email);
      } else {
        setCheck(false);
        setCurruntUserEmail(null);
      }
    });
  }, []);
  //db데이터 가져오기
  useEffect(() => {
    if (!currentUserEmail) return;
    const fetchData = async () => {
      const q = query(
        collection(db, 'users'),
        //fireStore 조건문
        where('email', '==', currentUserEmail)
      );
      const querySnapshot = await getDocs(q);

      let userData = [];

      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setData(userData);
    };
    fetchData();
  }, [currentUserEmail]);
  const outBtn = (e) => {
    e.preventDefault();
    signOut(auth);
  };

  return (
    <div>
      {!check && (
        <>
          <div>
            <Link to="/loginpage">로그인</Link>
          </div>
          <div>
            <Link to="/joinpage">회원가입</Link>
          </div>
        </>
      )}

      {check &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.nickName}님 환영합니다.</div>
              <button onClick={outBtn}>로그아웃</button>
            </div>
          );
        })}
    </div>
  );
}

export default Main;
