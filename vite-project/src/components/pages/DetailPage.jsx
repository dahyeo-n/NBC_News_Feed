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
    <div>
      <Header />
      <StPageWide>
        <div>
          <div key={post.id}>
            <StTitleWriteBox>
              <StTitle>{post.title}</StTitle>
              <StNickNameCreatedAt>
                {post.nickName} | {post.createdAt}
              </StNickNameCreatedAt>
            </StTitleWriteBox>
            <StContentWriteBox>{post.content}</StContentWriteBox>
            <StWriteCancleCompleteBtn>
              {user.email === post.email ? (
                <>
                  <Stbtn onClick={moveToWritePage}>Edit</Stbtn>
                  <Stbtn onClick={onDeletePostButtonClick}>Delete</Stbtn>
                </>
              ) : (
                ''
              )}
            </StWriteCancleCompleteBtn>
          </div>
        </div>
      </StPageWide>
    </div>
  );
};

// prop-types 정의 추가
DetailPage.propTypes = {
  posts: PropTypes.array.isRequired, // posts는 배열이며, 필수적으로 전달되어야 함을 의미
  setPosts: PropTypes.func.isRequired // setPosts는 함수이며, 필수적으로 전달되어야 함을 의미
};

export default DetailPage;

const StPageWide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 200;
  width: 100%;
  height: 800px;
  min-width: 800px;
  margin: auto;
  padding: auto;
  background-color: #1c1c20 !important;
  color: #fff !important;
  border-radius: 20px;
  font-size: x-large;
`;

const StTitleWriteBox = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  font-size: 22px;
  line-height: 230%;
  font-weight: bold;
  /* font-weight: 400; */
  letter-spacing: -0.02px;
  color: #7472e7;
`;

const StTitle = styled.div`
  color: #7472e7;
  font-size: 36px;
`;

const StNickNameCreatedAt = styled.div`
  color: #aaaaaa;
  font-size: 18px;
`;

const StContentWriteBox = styled.div`
  width: 700px;
  height: 100px;
  padding: 15px;
  margin: 0px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  font-size: 28px;
  font-weight: 600;
  align-items: baseline;
`;

const StWriteCancleCompleteBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 10px;
  margin: 20px 10px 0px 0px;
`;

const Stbtn = styled.button`
  border: none;
  margin: 10px;
  padding: 10px;
  font-size: medium;
  color: white;
  background-color: #3e3e3e;
  border-radius: 10px;
`;
