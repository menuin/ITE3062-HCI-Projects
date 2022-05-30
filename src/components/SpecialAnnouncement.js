import React from "react";
import styled from "styled-components";

const SpecialAnnouncementContainer = styled.div`
  /* margin-top: 40px;s */
  font-family: "Noto Sans KR", sans-serif;
`;
const AnnouncementTitle = styled.div`
  font-size: 30px;
  color: #444444;
`;
const SmallTitle = styled.div`
  color: #b8b8b8;
`;
const AnnouncementSlider = styled.div`
  position: relative;
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
`;
const AnnouncementCard = styled.div`
  width: 100%;
`;
const ImgContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  height: 200px;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const AttachmentImg = styled.img`
  height: 100%;
  border-radius: 15px;

  margin: 0px auto;
`;
const AnnouncementDescription = styled.div`
  display: flex;
`;
const Tag = styled.div`
  font-size: 14px;
  margin: 10px 3px;
  padding: 3px 10px;
  background-color: #f9ecba;
  border-radius: 20px;
  color: #444444;
`;
const SpecialAnnouncement = () => {
  return (
    <SpecialAnnouncementContainer>
      <SmallTitle>맞춤 공고</SmallTitle>
      <AnnouncementTitle>서울/국가유공자자녀</AnnouncementTitle>
      <AnnouncementSlider>
        <AnnouncementCard>
          <ImgContainer>
            <AttachmentImg src="/images/서울희망대학.png" />
          </ImgContainer>
          <AnnouncementDescription>
            <Tag>서울</Tag>
            <Tag>대학생</Tag>
            <Tag>국가유공자</Tag>
          </AnnouncementDescription>
        </AnnouncementCard>

        <AnnouncementCard>
          <ImgContainer>
            <AttachmentImg src="/images/상상장학생.png" />
          </ImgContainer>
          <AnnouncementDescription>
            <Tag>대학생</Tag>
            <Tag>국가유공자</Tag>
          </AnnouncementDescription>
        </AnnouncementCard>
      </AnnouncementSlider>
    </SpecialAnnouncementContainer>
  );
};

export default SpecialAnnouncement;
