import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const Topbar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  position: fixed;
  background-color: white;
`;
const GoBackward = styled.div`
  margin-left: 10px;
  color: #222222;
`;
const TopbarTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 20px;
`;
const SaveBtn = styled.label`
  font-family: "Noto Sans KR", sans-serif;
  margin-left: auto;
  margin-right: 20px;
`;
const FormContainer = styled.div`
  padding-top: 80px;
`;
const EmptyContainer = styled.div`
  width: 90%;
  height: 300px;
  margin: 0px 5%;
  background-color: #f4f4f4;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;
const Attachment = styled.img`
  height: 100%;
  margin: 0px auto;
`;
const ActionContainer = styled.div`
  width: 90%;
  margin: 20px 5%;
`;
const UpdateBtn = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 10px;
`;
const ReuploadBtn = styled(UpdateBtn)`
  background-color: #f4f4f4;
`;
const DeleteBtn = styled(UpdateBtn)`
  background-color: #f47e73;
  color: white;
`;

const Update = ({ userObj }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const docId = useParams().docid; // id of updated document
  const [attachment, setAttachment] = useState("");

  const fetchAttachment = async () => {
    const docRef = doc(db, "collection", docId);
    const docSnap = await getDoc(docRef);

    setAttachment(docSnap.data().attachmentURL);
  };
  useEffect(() => {
    fetchAttachment();
  }, []);
  const onBackwardClick = () => {
    navigate(-1);
  };
  const onFileChange = (event) => {
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
  const DeleteAttachment = () => {
    // delete attachment from storage
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
    DeleteAttachment();
    // update attachment
    await updateDoc(doc(db, "collection", docId), {
      attachmentURL: attachment,
      updated: Date.now(),
    });

    navigate(-1);
  };
  const onClickDelete = async () => {
    setLoading(true);
    // delete attachment from storage
    DeleteAttachment();
    // delete document
    await deleteDoc(doc(db, "collection", docId));
    navigate(-1);
  };
  return (
    <>
      <Topbar>
        <GoBackward onClick={onBackwardClick}>
          <IoIosArrowBack size={30} />
        </GoBackward>
        <TopbarTitle>수정</TopbarTitle>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <SaveBtn for="submit_file">저장</SaveBtn>
        )}
      </Topbar>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <EmptyContainer>
            {attachment === "" ? <>loading</> : <Attachment src={attachment} />}
          </EmptyContainer>

          <ActionContainer>
            <label for="input_file">
              <ReuploadBtn>다시 올리기</ReuploadBtn>
            </label>
            <DeleteBtn onClick={onClickDelete}>삭제</DeleteBtn>
          </ActionContainer>
          <input
            type="file"
            id="input_file"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
          <input type="submit" id="submit_file" style={{ display: "none" }} />
        </form>
      </FormContainer>
    </>
  );
};

export default Update;
