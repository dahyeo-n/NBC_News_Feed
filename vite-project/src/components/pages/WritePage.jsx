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
  const [isLoading, setIsLoading] = useState(false);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (selectedFile) {
        const storageRef = ref(storage, `uploads/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
      }
      if (id) {
        const updatedData = {
          title,
          content
        };
        await updateDoc(doc(db, 'posts', id), updatedData);
        dispatch(
          updatePost({
            id: id,
            updatedData: updatedData
          })
        );
        alert('게시물이 수정되었습니다!');
        navigate(`/detailpage/${id}`);
      } else {
        const newPost = {
          title,
          content,
          nickName,
          email,
          createdAt: new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).format(new Date())
        };
        const docRef = await addDoc(collection(db, 'posts'), newPost);
        dispatch(addPost({ ...newPost, id: docRef.id }));
        alert('새 게시물이 추가되었습니다!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error saving the post: ', error);
      alert('게시물 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const titleChangeHandler = (event) => setTitle(event.target.value);
  const contentChangeHandler = (event) => setContent(event.target.value);
  const cancelBtnhandler = () => {
    const userConfirmed = window.confirm('변경사항이 모두 초기화됩니다. 정말 나가시겠습니까?');
    if (userConfirmed) {
      setTitle('');
      setContent('');
      setSelectedFile(null);
      navigate('/');
    }
  };

  return (
    <div>
      <Header />
      <StPageWide>
        <form onSubmit={handleSubmit}>
          <div>
            <StTitleWriteBox
              type="text"
              value={title}
              name="title"
              placeholder="제목을 입력해주세요."
              onChange={titleChangeHandler}
              required
            />
            <StContentWriteBox
              type="text"
              value={content}
              name="content"
              placeholder="내용을 입력해주세요."
              onChange={contentChangeHandler}
              required
            />
            <div>
              {imageUrl && (
                <div>
                  <img src={imageUrl} alt="Post" style={{ maxWidth: '500px', maxHeight: '500px' }} />
                </div>
              )}
            </div>
            <StWriteCancleCompleteBtn>
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
