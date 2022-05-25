import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const Topbar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`;
const GoBackward = styled.div`
  padding-left: 10px;
  color: #222222;
`;
const Upload = ({ userObj }) => {
  const [docname, setDocname] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setDocname(value);
  };
  const onFileChange = (event) => {
    // read attachment URL -> for file preview
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/${v4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentURL = await getDownloadURL(attachmentRef);
    }
    const docObj = {
      docname,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };

    await addDoc(collection(db, `collection`), docObj);
    navigate(-1);
  };

  return (
    <>
      <Topbar>
        <GoBackward>
          <IoIosArrowBack size={30} />
        </GoBackward>
      </Topbar>
      <div>Upload Page</div>
      <form onSubmit={onSubmit}>
        <input
          name="docname"
          value={docname}
          placeholder="Name of the document"
          type="text"
          maxLength={50}
          onChange={onChange}
        />
        <input type="file" onChange={onFileChange} />
        {attachment && <img src={attachment} />}
        <input type="submit" value="Save" />
        {loading && "Loading.."}
      </form>
    </>
  );
};

export default Upload;
