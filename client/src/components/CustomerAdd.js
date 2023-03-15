import axios from 'axios';
import { useState } from 'react';

function CustomerAdd() {
   const [files, setFiles] = useState({
      file: null,
      fileName: '',
   });
   const { file, fileName } = files;
   const [inputs, setInputs] = useState({
      userName: '',
      birthday: '',
      gender: '',
      job: '',
   });
   const { userName, birthday, gender, job } = inputs;

   const handleFormSubmit = (e) => {
      e.preventDefault();
      addCustomer().then((res) => {
         console.log(res.data);
      });
      setFiles({
         file: null,
         fileName: '',
      });
      setInputs({
         userName: '',
         birthday: '',
         gender: '',
         job: '',
      });

      window.location.reload();
   };

   const addCustomer = () => {
      const url = '/api/customers';
      const formData = new FormData();
      formData.append('image', file);
      formData.append('name', userName);
      formData.append('birthday', birthday);
      formData.append('gender', gender);
      formData.append('job', job);
      const config = {
         headers: {
            'content-type': 'multipart/form-data',
         },
      };

      return axios.post(url, formData, config);
   };

   const handleFileChange = (e) => {
      setFiles({
         file: e.target.files[0],
         fileName: e.target.value,
      });
   };

   const handleValueChange = (e) => {
      const { value, name } = e.target;
      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   return (
      <form onSubmit={handleFormSubmit}>
         <h1>고객 추가 서버자동 반영확인필요</h1>
         프로필 이미지:
         <input
            type="file"
            name="file"
            file={file}
            value={fileName}
            onChange={handleFileChange}
         />
         <br />
         이름:
         <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleValueChange}
         />
         <br />
         생년월일:
         <input
            type="text"
            name="birthday"
            value={birthday}
            onChange={handleValueChange}
         />
         <br />
         성별:
         <input
            type="text"
            name="gender"
            value={gender}
            onChange={handleValueChange}
         />
         <br />
         직업:
         <input
            type="text"
            name="job"
            value={job}
            onChange={handleValueChange}
         />
         <br />
         <button type="submit">추가하기</button>
      </form>
   );
}

export default CustomerAdd;
