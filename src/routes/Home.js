import { signOut } from "firebase/auth";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Documents from "../components/Documents";
import Banner from "../components/Banner";
import Board from "./Board";

const Topbar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`;
const Button = styled.button`
  color: black;
  background-color: transparent;
  border: none;
  color: gray;
`;
const NavDiv = styled.div`
  display: flex;
`;
const Nav = styled.div`
  padding-left: 20px;
  font-size: 25px;
  font-family: "Noto Sans KR", sans-serif;
`;
const Nav1 = styled(Nav)`
  color: ${(props) => (props.isHome ? "#222222" : "gray")};
`;
const Nav2 = styled(Nav)`
  color: ${(props) => (props.isHome ? "gray" : "#222222")};
`;

const Home = ({ userObj }) => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const [isHome, setIsHome] = useState(true);

  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };
  const onNavClick = () => {
    setIsHome(!isHome);
  };
  useEffect(() => {
    const q = query(
      collection(db, "collection"),
      where("creatorId", "==", userObj.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const docArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(docArray);
    });
  });
  return (
    <>
      <Topbar>
        <NavDiv>
          <Nav1 isHome={isHome} onClick={onNavClick}>
            홈
          </Nav1>
          <Nav2 isHome={isHome} onClick={onNavClick}>
            공고
          </Nav2>
        </NavDiv>
        {/* <Button onClick={onLogOutClick}>
          <AiOutlineLogout size="35" />
        </Button> */}

        <Button>
          <CgProfile size="30" />
        </Button>
      </Topbar>
      {isHome ? (
        <>
          <Banner />
          <Documents userObj={userObj} />
        </>
      ) : (
        <Board />
      )}
    </>
  );
};

export default Home;
