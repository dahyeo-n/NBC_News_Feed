import styled from 'styled-components';
import { db } from '../firebase';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const StHeader = styled.header`
  background-color: white;
  padding: 30px; // 예시로 추가한 스타일
  height: 800px;
  max-height: 1000px; // 내용에 따라 이 범위 내에서 크기가 조정됨
`;

const StPageWide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 200;
  width: 1300px;
  height: 800px;
  min-width: 800px;
  margin: auto;
  padding: auto;
  background-color: white;
  border-radius: 10px;
  font-size: x-large;
`;

const StTitleWriteBox = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: gainsboro;
  font-size: larger;
  font-weight: 600;
`;

const StContentWriteBox = styled.div`
  width: 1000px;
  height: 200px;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: gainsboro;
  font-size: x-large;
  font-weight: 600;
  align-items: baseline;
`;

const StBoxWithImage = styled.div`
  width: 1000px;
  height: 230px;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  background-color: gainsboro;
  font-size: x-large;
  font-weight: 600;
  align-items: baseline;
`;

const StWriteCancleCompleteBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 10px;
  margin: 20px 10px 0px 0px;
`;

const DetailPage = ({ posts, setPosts }) => {
  // [보류] 게시물 하나씩 나오게 해야 수정사항 보일 듯 ^^..
  const [post, setPost] = useState(null); // 단일 게시물 데이터를 위한 상태
  const { postId } = useParams(); // 현재 게시물의 ID 추출
  const navigate = useNavigate();

  // Firebase에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const initialPosts = querySnapshot.docs.map((doc) => ({
        // doc에 id값을 추가해서 posts 추가
        id: doc.id,
        ...doc.data(),
        // createdAt을 적절한 날짜 형식으로 변환
        createdAt: doc.data().createdAt?.toDate().toLocaleString()
      }));
      setPosts(initialPosts);
    };
    fetchData();
  }, []);

  // Edit button Logic
  const moveToWritePage = (id) => {
    navigate(`/writepage/${id}`);
  };

  // deleteDoc을 사용하여 게시글 삭제
  const deletePost = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const postRef = doc(db, 'posts', id);
        await deleteDoc(postRef);
        setPosts((prev) => prev.filter((post) => post.id !== id));
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  return (
    <StHeader>
      <StPageWide>
        <h1>Header 넣어야 함</h1>
        <div>
          <h1>상세 페이지 글</h1>
          {posts.map((post) => (
            <div key={post.id}>
              <StTitleWriteBox>
                <div>{post.title}</div>
                <div>Nickname | {post.createdAt}</div>
              </StTitleWriteBox>
              <StBoxWithImage>
                {/* 전역 상태로 저장된 사진 불러와서 보여주기 */}
                {/* {post.imageUrl && <img src={imageUrl} alt="Post" style={{ maxWidth: '500px', maxHeight: '500px' }} />} */}
              </StBoxWithImage>
              <StContentWriteBox>{post.content}</StContentWriteBox>
              <StWriteCancleCompleteBtn>
                {/* 첫 작성일 때랑 수정일 때랑 다르게(삼항연산자) */}
                {/* .filter((post) => !post.isDone) // post.email === !post.email) */}
                <button onClick={() => moveToWritePage(post.id)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </StWriteCancleCompleteBtn>
            </div>
          ))}
        </div>
        <div></div>
      </StPageWide>
    </StHeader>
  );
};

// prop-types 정의 추가
DetailPage.propTypes = {
  posts: PropTypes.array.isRequired, // posts는 배열이며, 필수적으로 전달되어야 함을 의미
  setPosts: PropTypes.func.isRequired // setPosts는 함수이며, 필수적으로 전달되어야 함을 의미
};

export default DetailPage;
