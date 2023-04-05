import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  AiOutlineCloudDownload,
  AiOutlineEye,
  AiOutlineEdit,
} from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

const CardContainer = styled.div`
  width: 75%;
  background-color: ${(props) => (props.isClassified ? "#FEEAE2" : "#fef8e2")};
  height: 300px;
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
const CardBottom = styled.div`
  margin-top: 150px;
`;
const DocActionDiv = styled.div`
  margin-right: 25px;
  display: flex;
  justify-content: end;
`;
const DocAction = styled.div`
  color: #444444;
  margin-left: 8px;
`;
const UpdatedDiv = styled.div`
  float: right;
  font-family: "Noto Sans KR", sans-serif;
  color: #888888;
  font-size: 14px;
  /* margin-top: 190px; */
  margin-right: 20px;
`;
const StyledLink = styled(Link)`
  color: #444444;
`;

const Card = ({ docObj, index }) => {
  const [isDocClassified, setIsDocClassified] = useState(false);
  let updatedDate = new Date(docObj.data().updated);
  const specialDocList = [
    "cert_recipient",
    "cert_sp",
    "cert_disabled",
    "cert_foreigner",
  ];
  useEffect(() => {
    if (specialDocList.includes(docObj.data().docType)) {
      setIsDocClassified(true);
    }
  }, []);

  const renderDocName = (docType) => {
    switch (docType) {
      case "cert_enrollment":
        return "재학증명서";
      case "cert_transcript":
        return "성적증명서";
      case "cert_income":
        return "학자금 지원구간 통지서";
      case "cert_family":
        return "가족관계증명서";
      case "cert_recipient":
        return "기초생활수급자증명서";
      case "cert_sp":
        return "차상위계층 확인서";
      case "cert_disabled":
        return "장애인 등록증";
      case "cert_foreigner":
        return "외국인 등록증";
      default:
        return "unknown doctype";
    }
  };
  return (
    <CardContainer isClassified={isDocClassified}>
      <CardHead>
        <NameContainer>
          <DocName>서류</DocName>
          <CardName>{renderDocName(docObj.data().docType)}</CardName>
        </NameContainer>
        <EditContainer></EditContainer>
      </CardHead>

      <CardBottom>
        <DocActionDiv>
          <DocAction>
            <AiOutlineCloudDownload size={35} />
          </DocAction>
          {/* <DocAction>
              <AiOutlineEye size={30} />
            </DocAction> */}
          <DocAction>
            <StyledLink to={`update/${docObj.id}`}>
              <FiEdit2 size={28} />
            </StyledLink>
          </DocAction>
        </DocActionDiv>
        <UpdatedDiv>
          업데이트 : {updatedDate.getFullYear()}년 {updatedDate.getMonth() + 1}
          월 {updatedDate.getDate()}일
        </UpdatedDiv>
      </CardBottom>
    </CardContainer>
  );
};

export default Card;
