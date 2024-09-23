import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import pencilIcon from "../../assets/icons/pencil.svg";
import defaultProfile from "../../assets/images/default-profile.svg";
import defaultStadium from "../../assets/images/default-stadium.svg";
import Balloon from "./Balloon";
import useBalloonStore from "../../store/ballonStore";

interface ProfileComponentProps {
  profileImage: string | null;
  TeamLogo?: string | null;
  onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTeamClick?: React.MouseEventHandler<HTMLDivElement>;
  isEditing: boolean;
}

const ProfileComponent = ({
  profileImage,
  TeamLogo,
  onImageChange,
  onTeamClick,
  isEditing,
}: ProfileComponentProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const teamLogoRef = useRef<HTMLDivElement | null>(null);
  const [balloonPosition, setBalloonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const { showBalloon, balloonContent, setShowBalloon } = useBalloonStore(); // 전역 상태 사용
  const handleClick = () => {
    if (fileInputRef.current && isEditing) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (teamLogoRef.current && showBalloon) {
      const rect = teamLogoRef.current.getBoundingClientRect();
      setBalloonPosition({
        top: rect.top - 30, // 팀 로고 중앙 위쪽에 위치하도록 수정
        left: rect.left + rect.width / 2,
      });
    }
  }, [showBalloon]);

  const handleLogoHover = () => {
    setShowBalloon(true);
  };

  const handleLogoLeave = () => {
    setShowBalloon(false);
  };

  return (
    <ProfileContainer>
      <ProfileImage src={profileImage || defaultProfile} alt="프로필 이미지" />
      {isEditing ? (
        <>
          <UploadBtn onClick={handleClick}>
            <img src={pencilIcon} alt="프로필 업로드" />
          </UploadBtn>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
        </>
      ) : (
        <TeamLogoContainer
          ref={teamLogoRef}
          onClick={onTeamClick}
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <TeamLogoImg src={TeamLogo || defaultStadium} alt="구장 이미지" />
          {showBalloon && (
            <Balloon
              content={'팬 구단을 설정해요!'}
              position={{ top: -30, left: "50%" }}
            />
          )}
        </TeamLogoContainer>
      )}
    </ProfileContainer>
  );
};

export default ProfileComponent;

const ProfileContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: #fff;
`;

const UploadBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #888;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #777;
  }
`;

const TeamLogoContainer = styled.div`
  position: absolute;
  top: -10px;
  right: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px solid transparent;
  transition: border 0.2s ease-in-out;

  &:hover {
    border: 4px solid #fff;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const TeamLogoImg = styled.img`
  background: #b5b5b5;
  border-radius: 50%;
  width: 90%;
  height: 90%;
  object-fit: contain;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
