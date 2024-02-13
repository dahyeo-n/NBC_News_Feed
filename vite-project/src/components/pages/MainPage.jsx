import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firesbase';
import Header from '../commons/Header';
import User from '../commons/User';
import Card from '../commons/Card';
import styled from 'styled-components';

function MainPage({ posts, check, currentUser, authInfo, localUser, signUpUser, setSignUpUser }) {
  //로컬유저 정보 가져오기
  useEffect(() => {
    if (!localUser) return;
    const fetchData = async () => {
      const q = query(
        collection(db, 'users'),
        //fireStore 조건문
        where('email', '==', localUser)
      );
      const querySnapshot = await getDocs(q);

      let userData = [];

      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setSignUpUser(userData);
    };
    fetchData();
  }, [localUser]);

  return (
    <>
      <Header />
      <Parents>
        <Wrapper>
          <User check={check} authInfo={authInfo} currentUser={currentUser} signUpUser={signUpUser} />
          {posts !== null && <Card posts={posts} />}
        </Wrapper>
      </Parents>
    </>
  );
}

export default MainPage;
export const Parents = styled.div`
  width: 100%;
  border-top: 2px solid black;
`;
export const Wrapper = styled.div`
  display: flex;
`;
