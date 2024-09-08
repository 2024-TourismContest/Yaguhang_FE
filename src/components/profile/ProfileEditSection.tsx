// ProfileEditSection.tsx
import { useRef } from "react";
import styled from "styled-components";
import pencilIcon from "../../assets/icons/pencil.svg";
import defaultProfile from "../../assets/images/defaultProfile.webp";

const ProfileEditSection = ({ profileImage, onImageChange }: { profileImage: string | null; onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택창 열기
    }
  };

  return (
    <Container>
      <ProfileImgContainer>
        {profileImage ? (
          <ProfileImg src={profileImage} alt="프로필 이미지" />
        ) : (
          <ProfileImg src={defaultProfile} alt="프로필 이미지" />
        )}
        <UploadBtn onClick={handleClick}>
          <img src={pencilIcon} alt="프로필 업로드" />
        </UploadBtn>
        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </ProfileImgContainer>
      <ProfileText>프로필 이미지</ProfileText>
    </Container>
  );
};

export default ProfileEditSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: #fff;
`;

const UploadBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #888;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileText = styled.span`
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
`;
