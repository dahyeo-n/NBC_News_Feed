{
  !check && (
    <>
      <div>
        <Link to="/loginpage">로그인</Link>
      </div>
      <div>
        <Link to="/joinpage">회원가입</Link>
      </div>
    </>
  );
}

{
  check &&
    data.map((item) => {
      return (
        <div key={item.id}>
          <div>{item.nickName}님 환영합니다.</div>
          <button onClick={outBtn}>로그아웃</button>
        </div>
      );
    });
}
