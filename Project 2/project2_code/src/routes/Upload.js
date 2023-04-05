import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import "../css/loader.css";

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
const UploadContent = styled.div`
  width: 100%;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  color: #d7d7d7;
`;
const Attachment = styled.img`
  height: 100%;
  margin: 0px auto;
`;

const InfoContainer = styled.div`
  width: 90%;
  margin: 20px 5% 0px 5%;
  font-family: "Noto Sans KR", sans-serif;
`;
const InfoTitle = styled.div`
  font-size: 18px;
  color: #444444;
`;

const RadioBtnSlider = styled.div`
  position: relative;
  margin-top: 10px;
  display: flex;
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const TypeSelectBtn = styled.div`
  width: 100px;
  text-align: center;
  font-size: 13px;
`;
const RadioBtnLabel = styled.label`
  margin-right: 10px;
  height: 80px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: ${(props) =>
    props.crntType === props.for ? "#FCE17D" : "#fef8e2"};
`;
const SelectInput = styled.input`
  display: none;
`;

const SmallInfoTitle = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #636363;
`;

const Upload = ({ userObj }) => {
  const [docType, setDocType] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onBackwardClick = () => {
    navigate(-1);
  };

  const onSelectClick = (event) => {
    setDocType(event.target.value);
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
      updated: Date.now(),
      uploaderId: userObj.uid,
      attachmentURL,
      docType,
    };

    await addDoc(collection(db, `collection`), docObj);
    navigate(-1);
  };

  return (
    <>
      <Topbar>
        <GoBackward onClick={onBackwardClick}>
          <IoIosArrowBack size={30} />
        </GoBackward>
        <TopbarTitle>서류 등록하기</TopbarTitle>
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
          {attachment === "" ? (
            <label for="input_file">
              <EmptyContainer>
                <UploadContent>
                  <AiOutlinePlus size={35} />
                  <br />
                  이미지 또는 파일을 올려주세요
                </UploadContent>
              </EmptyContainer>
            </label>
          ) : (
            <>
              <EmptyContainer>
                <Attachment src={attachment} />
              </EmptyContainer>
              <InfoContainer>
                <InfoTitle>서류 유형을 선택해주세요</InfoTitle>
                <SelectInput
                  type="radio"
                  value="cert_enrollment"
                  id="cert_enrollment"
                  name="type"
                  onClick={onSelectClick}
                ></SelectInput>
                <SelectInput
                  type="radio"
                  value="cert_transcript"
                  id="cert_transcript"
                  name="type"
                  onClick={onSelectClick}
                ></SelectInput>
                <SelectInput
                  type="radio"
                  value="cert_income"
                  id="cert_income"
                  name="type"
                  onClick={onSelectClick}
                ></SelectInput>
                <SelectInput
                  type="radio"
                  value="cert_family"
                  id="cert_family"
                  name="type"
                  onClick={onSelectClick}
                ></SelectInput>
                <RadioBtnSlider>
                  <RadioBtnLabel crntType={docType} for="cert_enrollment">
                    <TypeSelectBtn>재학증명서</TypeSelectBtn>
                  </RadioBtnLabel>

                  <RadioBtnLabel crntType={docType} for="cert_transcript">
                    <TypeSelectBtn>성적증명서</TypeSelectBtn>
                  </RadioBtnLabel>

                  <RadioBtnLabel crntType={docType} for="cert_income">
                    <TypeSelectBtn>
                      학자금 지원구간
                      <br />
                      통지서(2022-2)
                    </TypeSelectBtn>
                  </RadioBtnLabel>

                  <RadioBtnLabel crntType={docType} for="cert_family">
                    <TypeSelectBtn>가족관계증명서</TypeSelectBtn>
                  </RadioBtnLabel>
                </RadioBtnSlider>

                <SmallInfoTitle>
                  수급자/차상위/장애인/국가유공자/외국인/기타
                </SmallInfoTitle>

                <SelectInput
                  type="radio"
                  value="cert_recipient"
                  id="cert_recipient"
                  name="type"
                  onClick={onSelectClick}
                ></SelectInput>
                <SelectInput
                  type="radio"
                  value="cert_sp"
                  id="cert_sp"
                  name="type"
                  onClick={onSelectClick}
                ></SelectInput>
                <SelectInput
                  type="radio"
                  value="cert_disabled"
                  id="cert_disabled"
                  name="type"
                  onClick={onSelectClick}
                ></SelectInput>
                <SelectInput
                  type="radio"
                  value="cert_foreigner"
                  id="cert_foreigner"
                  name="type"
                  onClick={onSelectClick}
                ></SelectInput>
                <RadioBtnSlider>
                  <RadioBtnLabel crntType={docType} for="cert_recipient">
                    <TypeSelectBtn>
                      기초생활수급자
                      <br />
                      증명서
                    </TypeSelectBtn>
                  </RadioBtnLabel>

                  <RadioBtnLabel crntType={docType} for="cert_sp">
                    <TypeSelectBtn>
                      차상위계층
                      <br />
                      확인서
                    </TypeSelectBtn>
                  </RadioBtnLabel>

                  <RadioBtnLabel crntType={docType} for="cert_disabled">
                    <TypeSelectBtn>장애인 등록증</TypeSelectBtn>
                  </RadioBtnLabel>

                  <RadioBtnLabel crntType={docType} for="cert_foreigner">
                    <TypeSelectBtn>외국인 등록증</TypeSelectBtn>
                  </RadioBtnLabel>
                </RadioBtnSlider>
              </InfoContainer>
            </>
          )}

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

export default Upload;
