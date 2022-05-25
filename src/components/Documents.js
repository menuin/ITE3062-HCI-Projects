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
  // const [tempDocs, setTempDocs] useState([]);
  const [docs, setDocs] = useState([]);
  const [isDocEmpty, setIsDocEmpty] = useState(false);
  const fetchData = async () => {
    // const cert_e_ref = doc(db, "cert_enrollment", userObj.uid);
    // const cert_i_ref = doc(db, "cert_income", userObj.uid);
    // const cert_t_ref = doc(db, "cert_transcript", userObj.uid);
    // const cert_r_ref = doc(db, "cert_recipient", userObj.uid);
    // const cert_d_ref = doc(db, "cert_disabled", userObj.uid);
    // const cert_s_ref = doc(db, "cert_singlep", userObj.uid);
    // const cert_f_ref = doc(db, "cert_foreigner", userObj.uid);

    // const eSnap = await getDoc(cert_e_ref); // getDocs - doc.data() will not be "undefined"
    // const iSnap = await getDoc(cert_i_ref);
    // const tSnap = await getDoc(cert_t_ref);
    // const rSnap = await getDoc(cert_r_ref);
    // const dSnap = await getDoc(cert_d_ref);
    // const sSnap = await getDoc(cert_s_ref);
    // const fSnap = await getDoc(cert_f_ref);
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
          <IoIosAddCircleOutline size={25} />
        </AddDocIcon>
      </SliderTop>
      <DocSlider ref={sliderRef}>
        {isDocEmpty ? (
          <Card isEmpty={isDocEmpty} />
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
