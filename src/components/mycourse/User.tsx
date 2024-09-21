import { useEffect, useState } from "react";
import styled from "styled-components";
import { mypage } from "../../apis/mypage"; // MyPageInfo 가져오기

const User = () => {
  const [userData, setUserData] = useState({
    nickname: "",
    image: "",
    fanTeam: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await mypage.MyPageInfo();
        setUserData(data);
      } catch (error) {
        console.error("유저 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UserDetails>
      <UserProfile>
        <UserImage src={userData.image} alt="User" />
        <FanTeamImage src={userData.fanTeam} alt="Fan Team" />
      </UserProfile>
      <Nickname>"{userData.nickname}"님의 추천행</Nickname>
    </UserDetails>
  );
};

export default User;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const UserProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const FanTeamImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
`;

const Nickname = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin-top: 15px;
`;
