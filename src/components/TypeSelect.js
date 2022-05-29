import React, { useState } from "react";
import styled from "styled-components";

const TypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const UserType = styled.label`
  width: 45%;
  margin: 10px 2%;
  height: 60px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.array.includes(props.userType) ? "#f7d22c" : "#f4f4f4"};
  color: ${(props) =>
    props.array.includes(props.userType) ? "white" : "black"};
`;
const TypeInput = styled.input`
  display: none;
`;
const TypeSelect = () => {
  const initArray = [];
  const [selectedType, setSelectedType] = useState(initArray);

  const userTypes = [
    "기초생활수급자",
    "차상위계층",
    "한부모가정",
    "장애인가정",
    "국가유공자",
    "북한이탈주민",
  ];
  const onTypeClick = (event) => {
    // 복수선택이 안되고 있음
    if (initArray.includes(`${event.target.id}`)) {
      const index = initArray.indexOf(`${event.target.id}`);
      initArray.splice(index, 1);
      setSelectedType(...initArray);
    } else {
      initArray.push(`${event.target.id}`);
      setSelectedType(...initArray);
    }
    console.log(initArray);
  };
  return (
    <TypesContainer>
      {userTypes.map((userType, index) => {
        return (
          <TypeInput
            type="radio"
            value={index}
            id={userType}
            key={index}
            onClick={onTypeClick}
          ></TypeInput>
        );
      })}
      {userTypes.map((userType, index) => {
        console.log(selectedType.includes(userType));
        return (
          <UserType array={selectedType} userType={userType} for={userType}>
            {userType}
          </UserType>
        );
      })}
    </TypesContainer>
  );
};

export default TypeSelect;
