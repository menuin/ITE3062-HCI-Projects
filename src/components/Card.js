import React, { useEffect } from "react";
import styled from "styled-components";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
const CardContainer = styled.div`
  width: 75%;
  background-color: #fef8e2;
  height: 400px;
  display: inline-block;
  margin: 0px 5px;
  border-radius: 15px;
`;
const CardHead = styled.div``;
const NameContainer = styled.div``;

const DocName = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 20px;
  color: #777777;
`;
const CardName = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  margin-left: 20px;
  color: #444444;
`;

const EditContainer = styled.div``;
const NotUploadedDiv = styled.div`
  margin: 0px 20px;
  text-align: center;
`;
const IconContainer = styled.div`
  color: #d7d7d7;
  margin-top: 80px;
`;
const Notification = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  color: #d7d7d7;
`;
const Card = ({ docObj, isEmpty, index }) => {
  // const renderCardName = (index) => {
  //   switch (index) {
  //     case 0:
  //       return "재학증명서";
  //     case 1:
  //       return "학자금 지원구간 통지서";
  //     case 2:
  //       return "성적증명서";
  //     default:
  //       return "서류";
  //   }
  // };
  return (
    <CardContainer>
      <CardHead>
        <NameContainer>
          <DocName>서류</DocName>
          <CardName>{docObj.data().title}</CardName>
        </NameContainer>
        <EditContainer></EditContainer>
      </CardHead>
      {isEmpty ? (
        <NotUploadedDiv>
          <IconContainer>
            <Link to="upload" style={{ color: "#d7d7d7" }}>
              <HiOutlineDocumentAdd size={70} />
            </Link>
          </IconContainer>
          <Notification>등록된 서류가 없어요</Notification>
        </NotUploadedDiv>
      ) : (
        <></>
      )}
    </CardContainer>
  );
};

export default Card;
