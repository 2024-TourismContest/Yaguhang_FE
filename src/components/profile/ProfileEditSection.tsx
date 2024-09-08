import { useRef } from "react";
import styled from "styled-components";
import pencilIcon from "../../assets/icons/pencil.svg";
import defaultProfile from "../../assets/images/defult-profile.jpg";

const ProfileEditSection = ({
  profileImage,
  onImageChange,
}: {
  profileImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택창 열기
    }
  };

  return (
    <Container>
      <ProfileImgContainer>
        <ProfileImg
          src={profileImage || defaultProfile}
          alt="프로필 이미지"
        />
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
  gap: 10px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 그림자 추가
  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #777; // 호버 상태 추가
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
  padding: 1rem;
  border-bottom: 0.3px solid #fff;

`;