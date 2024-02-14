import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as S from '../style/Card.style';

function Card() {
  const posts = useSelector(function (item) {
    return item.posts;
  });

  const navigate = useNavigate();
  return (
    <S.CardSection>
      {posts.map((post) => {
        return (
          <S.Parents
            key={post.id}
            onClick={() => {
              navigate(`/detailpage/${post.id}`);
            }}
          >
            <S.CardTitle>
              <h2>{post.title}</h2>
            </S.CardTitle>
            <S.CardNicknameCreatedAt>
              {post.nickName} ㅣ {post.createdAt}
            </S.CardNicknameCreatedAt>
            <S.CardContent>{post.content}</S.CardContent>
          </S.Parents>
        );
      })}
    </S.CardSection>
  );
}

export default Card;
