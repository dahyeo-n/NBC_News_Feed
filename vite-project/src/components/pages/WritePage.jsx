import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../../firesbase';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firesbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost } from '../../redux/modules/posts';
import Header from '../commons/Header';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const dispatch = useDispatch();
  const { email, nickName } = useSelector(function (item) {
    return item.user;
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        setIsLoading(true);
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          setTitle(postData.title);
          setContent(postData.content);
          setImageUrl(postData.imageUrl || '');
        } else {
          alert('게시물이 존재하지 않습니다.');
          navigate('/');
        }
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  // 새 게시글 작성 or 수정 로직
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // let uploadedImageUrl = imageUrl;
      if (selectedFile) {
        const storageRef = ref(storage, `uploads/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        // uploadedImageUrl = await getDownloadURL(storageRef);
      }

      if (id) {
        // 업데이트할 데이터 정의
        const updatedData = {
          title,
          content
          // imageUrl: uploadedImageUrl
        };
        await updateDoc(doc(db, 'posts', id), updatedData);

        // 우리의 redux와 sync 맞추기 => dispatch
        // put vs patch
        // put : 덮어쓰기
        // patch : 일부 변경하기
        dispatch(
          updatePost({
            id: id,
            updatedData: updatedData
          })
        );

        alert('게시물이 수정되었습니다!');
        navigate(`/detailpage/${id}`); // 수정된 게시글의 상세 페이지로 이동
      } else {
        // 추가로 들어가야 하는 것
        // user's nickName, email

        const newPost = {
          title,
          content,
          nickName,
          email,
          // 현재 날짜 및 시간을 "00월 00일 00시 00분" 형식으로 포맷팅
          createdAt: new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 24시간 형식
          }).format(new Date()) // imageUrl: uploadedImageUrl,
        };

        const docRef = await addDoc(collection(db, 'posts'), newPost);

        // dispatch
        dispatch(addPost({ ...newPost, id: docRef.id }));

        alert('새 게시물이 추가되었습니다!');
        // 수정된 게시글의 상세 페이지로 리다이렉트
        navigate(`/detailpage/${docRef.id}`, { state: { updated: true } });
      }
    } catch (error) {
      console.error('Error saving the post: ', error);
      alert('게시물 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 입력값 변경 처리 로직
  const titleChangeHandler = (event) => setTitle(event.target.value);
  const contentChangeHandler = (event) => setContent(event.target.value);

  // 취소 버튼 로직
  const cancelBtnhandler = () => {
    const userConfirmed = window.confirm('변경사항이 모두 초기화됩니다. 정말 나가시겠습니까?');
    if (userConfirmed) {
      // 사용자가 확인을 누른 경우, 폼 상태를 초기화
      setTitle('');
      setContent('');
      setSelectedFile(null);
      navigate('/');
    }
    // 사용자가 취소를 누른 경우, 아무것도 안 함
  };

  return (
    <div>
      <Header />
      <StPageWide>
        {/* <h1>{id ? '게시글 수정' : '새 게시글 작성'}</h1> */}
        <form onSubmit={handleSubmit}>
          <div>
            {/* 제목 입력 구간 */}
            <StTitleWriteBox
              type="text"
              value={title}
              name="title"
              placeholder="제목을 입력해주세요."
              onChange={titleChangeHandler}
              required
            />
            {/* 내용 입력 구간 */}
            <StContentWriteBox
              type="text"
              value={content}
              name="content"
              placeholder="내용을 입력해주세요."
              onChange={contentChangeHandler}
              required
            />
            {/* 사진 보이는 구간 */}
            <div>
              {imageUrl && (
                <div>
                  <img src={imageUrl} alt="Post" style={{ maxWidth: '500px', maxHeight: '500px' }} />
                </div>
              )}
            </div>
            {/* Cancle, Complete 버튼 구간 */}
            <StWriteCancleCompleteBtn>
              {/* submit은 onClick 이벤트 없이 form의 onSubmit 이벤트를 통해 처리됨 */}
              {/* 사용자가 현재 작업을 취소하고 폼을 초기 상태로 리셋.
              type="button"으로 설정하고 클릭 이벤트에 폼 상태를 초기화하는 함수 연결 */}
              <Stbtn type="button" onClick={cancelBtnhandler}>
                Cancle
              </Stbtn>
              <Stbtn type="submit" disabled={isLoading}>
                {isLoading ? 'in progress...' : 'Complete'}
              </Stbtn>
            </StWriteCancleCompleteBtn>
          </div>
        </form>
      </StPageWide>
    </div>
  );
};

export default WritePage;

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

const StTitleWriteBox = styled.input`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  font-size: 36px;
  line-height: 230%;
  font-weight: bold;
  /* font-weight: 400; */
  letter-spacing: -0.02px;
  color: #7472e7;
`;

const StContentWriteBox = styled.input`
  width: 700px;
  height: 100px;
  padding: 15px;
  margin: 0px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  color: #fff !important;
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
