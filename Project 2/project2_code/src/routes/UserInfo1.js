import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  Navigate,
  unstable_HistoryRouter,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import SectionSelect from "../components/SectionSelect";
import TypeSelect from "../components/TypeSelect";
import { db } from "../firebase";

const FullContainer = styled.div`
  width: 80%;
  margin: 0px 10%;
  /* background-color: beige; */
  font-family: "Noto Sans KR", sans-serif;
`;
const ProgressContainer = styled.div`
  margin-top: 100px;
  text-align: center;
  color: #a8a8a8;
`;
const Question = styled.div`
  width: 100%;
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
`;
const Description = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #a8a8a8;
  width: 100%;
  text-align: center;
`;
const FormContainer = styled.div`
  margin-top: 180px;
  margin-bottom: 50px;
  text-align: center;
`;
const SelectBox = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("images/arrow.jpg") no-repeat 95% 50%;
  color: black;
  background-color: white;
  border-color: #a8a8a8;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  padding: 0.8em 0.9em;
  font-family: "Noto Sans KR", sans-serif;
`;
const NextBtnContainer = styled.div`
  /* margin-top: 30px; */
  /* position: fixed; */
  /* width: 330px; */
  height: 50px;
  width: 100%;
  background-color: #f7d22c;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo1 = ({ userObj }) => {
  const [crntPage, setCrntPage] = useState(1);
  const [userSection, setUserSection] = useState();
  let userLocation = [];
  let userType = [];
  const navigate = useNavigate();

  const renderQuestion = () => {
    switch (crntPage) {
      case 1:
        return "주민등록상 거주지역을 선택해주세요";
      case 2:
        return (
          <>
            학자금 지원구간(소득분위)을
            <br />
            선택해주세요
          </>
        );
      case 3:
        return "해당되는 유형을 모두 선택해주세요";
      default:
        return "you've came to wrong path";
    }
  };
  const renderForm = () => {
    switch (crntPage) {
      case 1:
        return (
          <>
            <SelectBox>
              <option selected>서울특별시</option>
            </SelectBox>
            <SelectBox>
              <option selected>강동구</option>
            </SelectBox>
          </>
        );
      case 2:
        return <SectionSelect setUserSection={setUserSection} />;
      case 3:
        return <TypeSelect />;
      default:
        return "no form here";
    }
  };
  const onPage1Click = () => {
    userLocation = ["서울", "강동구"];
    setCrntPage(2);
  };
  const onPage2Click = () => {
    setCrntPage(3);
  };
  const onPage3Click = async () => {
    // update sooon!
    userType = ["차상위계층"];
    // user 정보 올리기
    const infoObj = {
      userId: userObj.uid,
      userLocation,
      userSection,
      userType,
    };
    await addDoc(collection(db, "user"), infoObj);
    navigate("/", { isInfoUpdate: true });
  };
  const onNextClick = () => {
    switch (crntPage) {
      case 1:
        onPage1Click();
        return;
      case 2:
        onPage2Click();
        return;
      case 3:
        onPage3Click();
        return;
      default:
    }
  };
  return (
    <FullContainer>
      <ProgressContainer>{crntPage}/3</ProgressContainer>
      <Question>{renderQuestion()}</Question>
      {crntPage == 2 && (
        <Description>*기초생활수급자(0분위) 차상위계층(1분위)</Description>
      )}
      <FormContainer>{renderForm()}</FormContainer>
      <NextBtnContainer onClick={onNextClick}>다음</NextBtnContainer>
    </FullContainer>
  );
};

export default UserInfo1;
