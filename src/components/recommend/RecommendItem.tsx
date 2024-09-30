import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
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
  handleDelete,
  isOpen: initialIsOpen = false,
}: {
  item: RecommendPreviewDto;
  isLast: boolean;
  isMine?: boolean;
  handleDelete: (recommendId: number) => void;
  isOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [likeCnt, setLikeCnt] = useState(item.likes);

  const likes = (cnt: number) => {
    setLikeCnt(cnt);
  };

  return (
    <>
      <Section>
        <Title>
          <h2>{item.title}</h2>
          <Li>
            <RecommendLikeButton
              contentId={item.recommendId}
              isMarked={item.isLiked}
              likes={(cnt: number) => likes(cnt)}
            />
            {likeCnt}
            {item.isMine && (
              <DeleteButton onClick={() => handleDelete(item.recommendId)}>
                <FaRegTrashAlt />
              </DeleteButton>
            )}
          </Li>
        </Title>
        <Li>
          <Container>
            <h3>{item.description}</h3>
            <p>{item.stadiumName} 야구장</p>
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
          </Container>
          <Button onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
            <DialogOpenButton />
          </Button>
        </Li>
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
  align-items: center;
  display: flex;
  h2 {
    height: 30px;
    font-size: 1.3em;
    font-weight: 600;
    margin-right: auto;
    align-content: center;
    margin-bottom: 10px;
    @media (max-width: 900px) {
      font-size: 1.3em;
    }
  }
`;

const Section = styled.section`
  color: white;
  margin: 20px 0;
  box-sizing: border-box;
`;

const Container = styled.div`
  margin-right: auto;
  padding-right: 10px;
  h3 {
    white-space: normal;
    line-height: 120%;
    font-size: 1.1em;
    font-weight: 400;
    color: #dfdfdf;
    text-align: justify;
    margin-bottom: 10px;
    @media (max-width: 900px) {
      font-size: 1em;
    }
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;

  h5 {
    margin-left: 10px;
  }
  svg {
    width: 30px;
    height: 30px;
  }
`;

export const Hr = styled.div`
  width: 100%;
  border-bottom: 1px dashed #ccc;
  margin-top: 20px;
`;

export const Button = styled.button<{ isOpen: boolean }>`
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
  padding: 0;
  margin-top: auto;
  margin-bottom: 10px;
  svg {
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease-in-out;
    width: 30px;
    height: 30px;
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
  height: 25px;
  position: absolute;
  bottom: 2%;
  right: 1%;
`;

const DateWrapper = styled.div`
  flex-direction: column;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;
