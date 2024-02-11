import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useHistory, useParams } from 'react-router-dom';

const StPageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const StTitle = styled.h1`
  text-align: left;
`;

const StMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StNickname = styled.span`
  font-weight: bold;
`;

const StDate = styled.span`
  color: gray;
`;

const StImage = styled.img`
  max-width: 100%;
  margin: 20px 0;
`;

const StContent = styled.p`
  text-align: left;
`;

const StActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StButton = styled.button`
  margin-left: 10px;
`;

const DetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, 'posts', postId));
      history.push('/'); // or wherever you want to redirect after deletion
    }
  };

  const handleEdit = () => {
    history.push(`/edit/${postId}`);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <StPageContainer>
      <StTitle>{post.title}</StTitle>
      <StMetadata>
        <StNickname>{post.nickname}</StNickname>
        <StDate>{post.createdAt}</StDate>
      </StMetadata>
      {post.imageUrl && <StImage src={post.imageUrl} alt="Post" />}
      <StContent>{post.content}</StContent>
      <StActionButtons>
        <StButton onClick={handleEdit}>수정</StButton>
        <StButton onClick={handleDelete}>삭제</StButton>
      </StActionButtons>
    </StPageContainer>
  );
};

export default DetailPage;
