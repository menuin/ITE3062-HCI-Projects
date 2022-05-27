import React from "react";
import styled from "styled-components";

const EmptyCardContainer = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  height: 300px;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;
const EmptyCardContent = styled.div`
  width: 100%;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  color: #d7d7d7;
`;
const EmptyCard = () => {
  return (
    <EmptyCardContainer>
      <EmptyCardContent>등록된 서류가 없어요</EmptyCardContent>
    </EmptyCardContainer>
  );
};

export default EmptyCard;
