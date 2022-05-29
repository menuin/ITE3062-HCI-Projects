import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const BannerBg = styled.div`
  width: 100%;
  background-color: #f4f4f4;
`;
const BannerContainer = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-bottom: 20px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 10px;
`;
const BannerTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BannerIcon = styled.div`
  color: #444444;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const BannerImg = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;
const BannerDescription = styled.div`
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  color: #444444;
`;
const StyledLink = styled(Link)`
  color: #444444;
  text-decoration: none;
`;
const Banner = ({ isHome }) => {
  return (
    <BannerBg>
      <BannerContainer>
        <BannerTop>
          <BannerDescription>
            {isHome ? (
              <>
                ⭐ 2022-2학기 <br />
                국가장학금 신청하러 가기
              </>
            ) : (
              <>
                소득분위 정보를 입력하면 <br />딱 맞는 장학금 공고를 알려드려요
              </>
            )}
          </BannerDescription>
          <BannerIcon>
            {isHome ? (
              <IoIosArrowForward size={25} />
            ) : (
              <StyledLink to="input">
                <IoIosArrowForward size={25} />
              </StyledLink>
            )}
          </BannerIcon>
        </BannerTop>
        {/* <BannerImg
          src="/images/국가장학금신청배너.jpg"
          alt="국가장학금 신청 배너"
        /> */}
      </BannerContainer>
    </BannerBg>
  );
};

export default Banner;
