import { useEffect, useState } from "react";
import styled from "styled-components";
import { mypage } from "../../apis/mypage";
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
      <Nickname>
        <span>"{userData.nickname}"</span>님의 추천행
      </Nickname>
    </UserDetails>
  );
};

export default User;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  max-width: 60vw;
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
  object-fit: cover;
`;

const Nickname = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin-top: 15px;
  letter-spacing: 1px;
  color: #dfdfdf;

  span {
    font-weight: 600;
    color: #fff;
  }
`;
