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
import EmptyCard from "./EmptyCard";
import { Link } from "react-router-dom";

const SliderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 30px 5% 10px 5%;
`;
const SliderTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
`;
const AddDocIcon = styled.div`
  display: flex;
  align-items: center;
  &:link {
    color: black;
  }
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
  const [isDocEmpty, setIsDocEmpty] = useState(false);
  const fetchData = async () => {
    // const cert_e_ref = doc(db, "cert_enrollment", userObj.uid);
    // const eSnap = await getDoc(cert_e_ref); // getDocs - doc.data() will not be "undefined"

    console.log(userObj.uid);
    const q = query(
      collection(db, "collection"),
      where("uploaderId", "==", userObj.uid)
    );
    const docSnap = await getDocs(q);
    setDocs(docSnap.docs);
    setIsDocEmpty(docSnap.empty);
    // setTempDocs([eSnap.data(), iSnap.data(), tSnap.data(),rSnap.data(),dSnap.data(),sSnap.data(),fSnap.data()])
    // setDocs([eSnap.data(), iSnap.data(), tSnap.data()]);
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
          <Link to="upload">
            <IoIosAddCircleOutline size={30} />
          </Link>
        </AddDocIcon>
      </SliderTop>
      <DocSlider ref={sliderRef}>
        {isDocEmpty ? (
          <EmptyCard />
        ) : (
          <>
            {docs.map((doc, index) => {
              return <Card docObj={doc} key={doc.id} index={index} />;
            })}
          </>
        )}
      </DocSlider>
    </>
  );
};

export default Documents;
