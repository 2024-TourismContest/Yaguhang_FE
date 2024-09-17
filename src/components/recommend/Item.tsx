import { useState } from "react";
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
  return (
    <>
      <Section>
        <Title>
          <li>
            <h2>{item.title}</h2>
            <Info>
              <p>{item.stadiumName} 야구장</p>
            </Info>
          </li>
          <Li>
            <RecommendLikeButton
              contentId={item.recommendId}
              isMarked={item.isLiked}
            />
            {item.likes}
          </Li>
        </Title>
        <Title>
          <Li>
            {!isMine && (
              <>
                <ProfileImg src={item.profileImage} alt="프로필" />
                <h5>{item.authorName}</h5>
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
      {isOpen && <RecommendDetail recommendId={item.recommendId} />}
      {!isLast && <Hr />}
    </>
  );
};

const ProfileImg = styled.img`
  height: 60px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-top: 10px;
  @media (max-width: 500px) {
    height: 40px;
  }
`;

const Title = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;

  h2 {
    font-size: 1.8em;
    font-weight: 500;
    margin-bottom: 15px;
    @media (max-width: 900px) {
      font-size: 1.3em;
    }
  }
`;
const Info = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 15px;
`;
const Section = styled.section`
  color: white;
  width: 70vw;
  padding: 3 / tvh;
  margin-bottom: 0;
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
  border-bottom: 1px solid #c8c3c3;
  @media (max-width: 900px) {
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
