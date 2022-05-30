import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import styled from "styled-components";
import {
  collection,
  query,
  doc,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const FilterContainer = styled.div`
  display: flex;
  position: relative;
  white-space: nowrap;
  overflow-x: scroll;
  width: 90%;
  margin: 30px 5% 10px 5%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Filter = styled.button`
  background-color: ${(props) =>
    props.value == props.crntFilter ? "#444444" : "white"};
  color: ${(props) => (props.value == props.crntFilter ? "white" : "#444444")};
  border: 1px solid #444444;
  margin: 0px 3px;
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 20px;
  padding: 5px 15px;
`;
const AnnouncementContainer = styled.div`
  width: 90%;
  margin: 20px 5% 0px 5%;
`;
const Announcemnet = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  padding-bottom: 5px;
  color: #444444;
  margin: 5px 0px 10px 0px;
  border-bottom: solid black;
  border-width: 0.1em;
  border-color: #ebebeb;
`;
const Board = () => {
  const filterList = ["전체", "생활비", "중복수혜가능", "장비지원", "근로"];
  const [crntFilter, setCrntFilter] = useState("전체");
  const [docs, setDocs] = useState([]);
  const [isDefault, setIsDefault] = useState(true);

  const onFilterClick = (event) => {
    setCrntFilter(event.target.value);
    if (crntFilter !== "전체") {
      setIsDefault(false);
    } else {
      setIsDefault(true);
    }
  };
  const fetchAnnouncementData = async () => {
    const q = query(collection(db, "announcement"));
    const docSnap = await getDocs(q);
    setDocs(docSnap.docs);
  };
  useEffect(() => {
    fetchAnnouncementData();
  }, []);

  return (
    <>
      <FilterContainer>
        {filterList.map((filter, index) => {
          return (
            <Filter
              key={index}
              value={filter}
              crntFilter={crntFilter}
              onClick={onFilterClick}
            >
              {filter}
            </Filter>
          );
        })}
      </FilterContainer>
      <AnnouncementContainer>
        {isDefault ? (
          <>
            {docs.map((doc, index) => (
              <Announcemnet key={index}>{doc.data().title}</Announcemnet>
            ))}
          </>
        ) : (
          <>
            {docs
              .filter((doc) => doc.data().type.includes(crntFilter))
              .map((doc, index) => (
                <Announcemnet key={index}>{doc.data().title}</Announcemnet>
              ))}
          </>
        )}
      </AnnouncementContainer>
      <Banner isHome={false} />
    </>
  );
};

export default Board;
