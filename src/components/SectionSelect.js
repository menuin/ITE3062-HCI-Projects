import React from "react";
import styled from "styled-components";

const SelectIncomeContainer = styled.div`
  display: flex;
`;
const SectionLabel = styled.label``;
const IncomeSection = styled.div``;
const SectionSelect = () => {
  return (
    <SelectIncomeContainer>
      <SectionSelect
        type="radio"
        value="0"
        id="section_0"
        name="type"
      ></SectionSelect>
      <SectionSelect
        type="radio"
        value="1"
        id="section_1"
        name="type"
      ></SectionSelect>
      <SectionSelect
        type="radio"
        value="2"
        id="section_2"
        name="type"
      ></SectionSelect>
      <SectionSelect
        type="radio"
        value="3"
        id="section_3"
        name="type"
      ></SectionSelect>

      <SectionLabel for="section_0">0</SectionLabel>
    </SelectIncomeContainer>
  );
};

export default SectionSelect;
