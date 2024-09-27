import { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { styled } from "styled-components";
import DialogOpenButton from "../../assets/icons/DialogOpenButton";
import { RecommendPreviewDto } from "../../types/recommendType";
import RecommendDetail from "./RecommendDetail";
import { RecommendLikeButton } from "./recommendLikeButton";
export const Item = ({
  item,
  isLast,
  isMine,
}: {
  item: RecommendPreviewDto;
  isLast: boolean;
  isMine?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [likeCnt, setLikeCnt] = useState(item.likes);
  const likes = (cnt: number) => {
    setLikeCnt(cnt);
  };
  return (
    <>
      <Section>
        <Title>
          <li>
            <h2>{item.title}</h2>
            <h3>{item.description}</h3>
            <Info>
              <p>{item.stadiumName} 야구장</p>
            </Info>
          </li>
          <Li>
            <RecommendLikeButton
              contentId={item.recommendId}
              isMarked={item.isLiked}
              likes={(cnt: number) => likes(cnt)}
            />
            {likeCnt}
          </Li>
        </Title>
        <Title>
          <Li>
            {!isMine && (
              <>
                <ImgWrapper>
                  {item.profileImage ? (
                    <ProfileImg src={item.profileImage} alt="프로필" />
                  ) : (
                    <IoPersonCircleOutline />
                  )}
                  <Fan src={item.likeTeamUrl} />
                </ImgWrapper>
                <DateWrapper>
                  <h5>{item.authorName}</h5>
                  <h5
                    style={{
                      marginTop: "8px",
                      color: "#ccc",
                      fontSize: "12px",
                    }}
                  >
                    {item.createdAt}
                  </h5>
                </DateWrapper>
              </>
            )}
          </Li>
          <li>
            <Button onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
              <DialogOpenButton />
            </Button>
          </li>
        </Title>
      </Section>
      {isOpen && (
        <RecommendDetail
          recommendId={item.recommendId}
          stadiumId={item.stadiumId}
        />
      )}
      {!isLast && <Hr />}
    </>
  );
};

const ProfileImg = styled.img`
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  @media (max-width: 500px) {
    height: 30px;
  }
`;

const Title = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;

  h2 {
    font-size: 1.3em;
    font-weight: 600;
    margin-bottom: 10px;
    @media (max-width: 900px) {
      font-size: 1.3em;
    }
  }
  h3 {
    font-size: 1.1em;
    font-weight: 400;
    color: #dfdfdf;
    margin-bottom: 20px;
    @media (max-width: 900px) {
      font-size: 1em;
    }
  }
`;
const Info = styled.div`
  display: flex;
  gap: 4px;
`;
const Section = styled.section`
  color: white;
  padding: 1%;
  margin-bottom: 0;
  box-sizing: border-box;
  @media (max-width: 900px) {
    width: 85vw;
  }
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  h5 {
    margin-left: 10px;
  }
`;

export const Hr = styled.hr`
  width: 70vw;
  border-bottom: 1px dashed #d9d9d9;
  @media (max-width: 900px) {
    width: 85vw;
  }
`;
export const Button = styled.button<{ isOpen: boolean }>`
  background-color: transparent;
  border: none;
  width: 42px;
  height: 42px;
  padding: 0;

  svg {
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease-in-out;
    width: 42px;
    height: 42px;
  }
`;
const ImgWrapper = styled.div`
  height: 60px;
  aspect-ratio: 1/1;
  margin-top: 10px;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
  }
`;
const Fan = styled.img`
  height: 30px;
  width: 30px;
  aspect-ratio: 1/1;
  position: absolute;
  bottom: 2%;
  right: 1%;
`;

const DateWrapper = styled.div`
  flex-direction: column;
`;
