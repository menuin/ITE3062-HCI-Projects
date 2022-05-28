import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SectionSelect from "../components/SectionSelect";

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
const FormContainer = styled.div`
  margin-top: 250px;
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
  margin-top: 30px;
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
  let userLocation = [];
  let userIncome;
  let userState = [];

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
              <option>부산광역시</option>
              <option>대구광역시</option>
              <option>인천광역시</option>
            </SelectBox>
            <SelectBox>
              <option selected>강동구</option>
              <option>종로구</option>
              <option>중구</option>
              <option>용산구</option>
              <option>성동구</option>
              <option>광진구</option>
              <option>동대문구</option>
              <option>중랑구</option>
              <option>성북구</option>
              <option>송파구</option>
              <option>강남구</option>
            </SelectBox>
          </>
        );
      case 2:
        // return <SectionSelect />;
        return;
      case 3:
        return;
      default:
        return "no form here";
    }
  };
  const onPage1Click = () => {
    userLocation = ["서울", "강동구"];
    setCrntPage(2);
  };
  const onPage2Click = () => {};
  const onNextClick = () => {
    switch (crntPage) {
      case 1:
        onPage1Click();
        return;
      case 2:
        onPage2Click();
        return;
      default:
    }
  };
  return (
    <FullContainer>
      <ProgressContainer>{crntPage}/3</ProgressContainer>
      <Question>{renderQuestion()}</Question>
      <FormContainer>
        {renderForm()}
        <NextBtnContainer onClick={onNextClick}>다음</NextBtnContainer>
      </FormContainer>
    </FullContainer>
  );
};

export default UserInfo1;