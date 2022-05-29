import React, { useState } from "react";
import styled from "styled-components";

const SelectIncomeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const SectionRadioBtn = styled.input`
  display: none;
`;
const SectionLabel = styled.label`
  width: 40px;
  height: 40px;
  display: flex;
  margin: 3px 3px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${(props) =>
    props.sectionType === props.value + "" ? "#f7d22c" : "#f4f4f4"};
  color: ${(props) =>
    props.sectionType === props.value + "" ? "white" : "#black"};
`;
const SectionSelect = ({ setUserSection }) => {
  const [sectionType, setSectionType] = useState();
  const sections = [
    "section_0",
    "section_1",
    "section_2",
    "section_3",
    "section_4",
    "section_5",
    "section_6",
    "section_7",
    "section_8",
    "section_9",
    "section_10",
  ];
  const onSectionClick = (event) => {
    setSectionType(event.target.value);
    setUserSection(event.target.value);
  };
  return (
    <SelectIncomeContainer>
      {sections.map((section, index) => {
        return (
          <SectionRadioBtn
            type="radio"
            value={index}
            id={section}
            name="section"
            key={index}
            onClick={onSectionClick}
          ></SectionRadioBtn>
        );
      })}

      {sections.map((section, index) => {
        return (
          <SectionLabel
            sectionType={sectionType}
            key={index}
            value={index}
            for={section}
          >
            {index}
          </SectionLabel>
        );
      })}
    </SelectIncomeContainer>
  );
};

export default SectionSelect;
