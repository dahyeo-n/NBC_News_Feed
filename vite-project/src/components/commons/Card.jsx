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
            <div>
              {post.nickName} ㅣ {post.createdAt}
            </div>
            <div>{post.imageUrl}</div>
            <div>{post.content}</div>
          </S.Parents>
        );
      })}
    </S.CardSection>
  );
}

export default Card;
