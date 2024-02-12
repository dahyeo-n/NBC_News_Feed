import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firesbase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firesbase';
import Header from './Header';
import User from './User';
import Card from './Card';
import styled from 'styled-components';

function MainPage() {
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
  }, [data]);
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
  //로그아웃
  const outBtn = (e) => {
    e.preventDefault();
    signOut(auth);
  };

  return (
    <div>
      <Header />
      <Parents>
        <Wrapper>
          <UserSection>
            <User />
          </UserSection>
          <CardSection>
            <Card />
          </CardSection>
        </Wrapper>
      </Parents>
    </div>
  );
}

export default MainPage;
export const Parents = styled.div`
  width: 100%;
  heigth:100%
  display: flex;
  border: 2px solid black;
  background-color: lightgrey;
`;
export const Wrapper = styled.div`
  display: flex;
`;
export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
