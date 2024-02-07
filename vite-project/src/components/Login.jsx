import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <main>
      <section>
        {/* 로그인,비번 최상위 부모 */}
        <div>
          <h2>LOGIN</h2>
          <form>
            <div>
              <input type="email" placeholder="이메일" autoFocus="autofocus" />
              {/* <div>*아이디를 입력해주세요.</div> */}
            </div>
            <div>
              <input
                type="password"
                placeholder="password"
                autoFocus="autofocus"
              />
              {/* <div>*비밀번호를 입력해주세요.</div> */}
            </div>
            <div>
              <button type="submit">로그인</button>
            </div>
          </form>
          {/* form 파트 끝 부분 */}
          {/* 회원가입부분 */}
          <div>
            <ul>
              <li>
                <Link to={'/join'}>회원가입</Link>
              </li>
            </ul>
          </div>
          {/* 회원가입 파트 끝 */}
          {/* 소셜로그인 */}
          <div>
            <p>or</p>
            <ul>
              <li>
                <Link to={''}>구글 로그인</Link>
              </li>
              <li>
                <Link to={''}>깃허브 로그인</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
