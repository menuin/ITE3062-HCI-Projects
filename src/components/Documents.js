import {
  collection,
  query,
  doc,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Card from "./Card";
import { IoIosAddCircleOutline } from "react-icons/io";

const SliderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 10px 5%;
`;
const SliderTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
`;
const AddDocIcon = styled.div`
  display: flex;
  align-items: center;
`;
const DocSlider = styled.div`
  position: relative;
  width: 90%;
  margin-left: 5%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Documents = ({ userObj }) => {
  const sliderRef = useRef();
  const [docs, setDocs] = useState([]);
  const fetchData = async () => {
    const cert_e_ref = doc(db, "cert_enrollment", userObj.uid);
    const cert_i_ref = doc(db, "cert_income", userObj.uid);
    const cert_t_ref = doc(db, "cert_transcript", userObj.uid);

    const eSnap = await getDoc(cert_e_ref); // getDocs - doc.data() will not be "undefined"
    const iSnap = await getDoc(cert_i_ref);
    const tSnap = await getDoc(cert_t_ref);

    setDocs([eSnap.data(), iSnap.data(), tSnap.data()]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SliderTop>
        <SliderTitle>내 서류 보관함</SliderTitle>
        <AddDocIcon>
          추가 &nbsp;
          <IoIosAddCircleOutline size={25} />
        </AddDocIcon>
      </SliderTop>
      <DocSlider ref={sliderRef}>
        {docs.map((doc, index) => {
          return <Card docObj={doc} key={doc} index={index} />;
        })}
      </DocSlider>
    </>
  );
};

export default Documents;
