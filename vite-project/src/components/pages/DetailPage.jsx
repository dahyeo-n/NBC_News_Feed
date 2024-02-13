import styled from 'styled-components';
import { db } from '../../firesbase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../commons/Header';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../redux/modules/posts';

// 기억 { currentUser }
const DetailPage = () => {
  const { posts, user } = useSelector(function (item) {
    return item;
  });

  // const [post, setPost] = useState(null); // 단일 게시물 데이터를 위한 상태
  const { id: postId } = useParams(); // 현재 게시물의 ID 추출
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = posts.find(function (p) {
    return p.id === postId;
  });

  // DetailPage 컴포넌트 내 useEffect
  // const fetchPost = async () => {
  //   const docRef = doc(db, 'posts', postId);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     setPost({ id: docSnap.id, ...docSnap.data() }); // 게시물 데이터 상태 업데이트
  //   } else {
  //     navigate('/');
  //   }
  // };

  // useEffect(() => {
  //   fetchPost();
  // }, [postId]); // postId가 변경될 때마다 실행

  // Edit button Logic
  const moveToWritePage = () => {
    navigate(`/writepage/${post.id}`);
  };

  // deleteDoc을 사용하여 게시글 삭제
  const onDeletePostButtonClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const postRef = doc(db, 'posts', post.id);
        await deleteDoc(postRef);
        // setPosts((prev) => prev.filter((post) => post.id !== id));

        // dispatch
        dispatch(deletePost(post.id));
        navigate('/');
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };
  return (
    <StHeader>
      <Header />
      <StPageWide>
        <div>
          <h1>상세 페이지 글</h1>
          <div key={post.id}>
            <StTitleWriteBox>
              <div>{post.title}</div>
              <div>
                {post.nickName} | {post.createdAt}
              </div>
            </StTitleWriteBox>
            <StBoxWithImage>
              {/* 전역 상태로 저장된 사진 불러와서 보여주기 */}
              {/* {post.imageUrl && <img src={imageUrl} alt="Post" style={{ maxWidth: '500px', maxHeight: '500px' }} />} */}
            </StBoxWithImage>
            <StContentWriteBox>{post.content}</StContentWriteBox>
            <StWriteCancleCompleteBtn>
              {user.email === post.email ? (
                <>
                  <button onClick={moveToWritePage}>Edit</button>
                  <button onClick={onDeletePostButtonClick}>Delete</button>
                </>
              ) : (
                ''
              )}
            </StWriteCancleCompleteBtn>
          </div>
        </div>
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

const StHeader = styled.div`
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
