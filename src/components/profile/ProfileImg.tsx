import { useRef } from "react";
import styled from "styled-components";
import pencilIcon from "../../assets/icons/pencil.svg";
import defaultProfile from "../../assets/images/defult-profile.jpg";

interface ProfileImgProps {
  profileImage: string | null;
  stadiumImage?: string | null; // 구장 이미지 추가
  onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean; // 편집 모드 여부
}

const ProfileImg = ({
  profileImage,
  stadiumImage,
  onImageChange,
  isEditing,
}: ProfileImgProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current && isEditing) {
      fileInputRef.current.click(); // 파일 선택창 열기 (편집 모드일 때만)
    }
  };

  return (
    <ProfileImgContainer>
      {isEditing ? (
        <>
          <ProfileImage
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
        </>
      ) : (
        // 편집 모드가 아닐 때, 프로필 이미지 대신 구장 이미지 표시
        <ProfileImage src={stadiumImage || defaultProfile} alt="구장 이미지" />
      )}
    </ProfileImgContainer>
  );
};

export default ProfileImg;

const ProfileImgContainer = styled.div`
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #777;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;
