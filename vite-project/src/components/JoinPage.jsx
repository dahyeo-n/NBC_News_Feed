import React from 'react';

function JoinPage() {
  return (
    <div>
      <div>
        <h2>JOIN</h2>
        <form>
          <div>
            <div>
              <label>E-mail</label>
              <input type="email" />@
              <select name="domain">
                <option>naver.com</option>
                <option>gmail.com</option>
                <option>daum.net</option>
                <option>nate.com</option>
                <option>직접입력</option>
              </select>
            </div>
          </div>
          {/* 유저정보 */}
          <div>
            <p>
              <label>닉네임</label>
              <input type="text" />
              <div>닉네임을 입력은 필수입니다.</div>
            </p>
          </div>
          <div>
            <p>
              <label>비밀번호</label>
              <input type="password" />
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            </p>
            <p>
              <label>비밀번호 확인</label>
              <input type="password" />
              <div>비밀번호가 다릅니다.</div>
            </p>
          </div>
          <button>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;
