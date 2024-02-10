// components/FileUpload.js
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { auth, storage } from '../firebase';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // ref라는 함수를 통해 storage 내부에 저장할 위치를 정할 수 있음
    // 두 번째 인자로 folder/file이라는 이름으로 저장(/로 경로 구분)
    const imageRef = ref(storage, `${auth.currentUser.delete.uid}/${selectedFile.name}`);
    // 첫 번째 인자로 참조값인 imageRef를 받고, 두 번째 인자로 실제로 업로드할 파일 적음
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    console.log('downloadURL', downloadURL);
  };

  return (
    <div>
      <h2>파일 업로드 컴포넌트</h2>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
export default FileUpload;
