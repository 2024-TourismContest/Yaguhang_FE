import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsBookmarkFill, BsBookmarkStar } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { IoMdCheckboxOutline } from "react-icons/io";
import DefaultImg from "../../assets/images/DefaultCircle.svg";

interface ScrapData {
  contentId: number;
  image: string;
  title: string;
  address: string;
  categoryLogo: string;
}

interface CreateCourseProps {
  scrapData: ScrapData[];
  contentIdList: number[];
  setContentIdList: React.Dispatch<React.SetStateAction<number[]>>;
  stadium: string;
  setStadium: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  selectedSpot: string;
}

const CreateCourse: React.FC<CreateCourseProps> = ({
  scrapData,
  contentIdList,
  setContentIdList,
  title,
  setTitle,
  description,
  setDescription,
  selectedSpot,
}) => {
  const maxLength = 400;
  const [recommendList, setRecommendList] = useState<ScrapData[]>([]);

  const handleScrapItemClick = (item: ScrapData) => {
    if (!recommendList.find((i) => i.contentId === item.contentId)) {
      setRecommendList([...recommendList, item]);
      setContentIdList([...contentIdList, item.contentId]);
    }
  };

  const handleRecommendItemClick = (contentId: number) => {
    const updatedList = recommendList.filter(
      (item) => item.contentId !== contentId
    );
    setRecommendList(updatedList);
    setContentIdList(updatedList.map((item) => item.contentId));
  };

  useEffect(() => {
    setRecommendList([]);
    setContentIdList([]);
  }, [selectedSpot]);

  return (
    <Container>
      <CourseHeader>
        <CourseTitleLabel>추천행 제목 :</CourseTitleLabel>
        <Input
          type="text"
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CourseTitleLabel>추천행 설명글 :</CourseTitleLabel>
        <TextareaWrapper>
          <Textarea
            placeholder="추천행 리스트를 설명해 주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={maxLength}
          />
          <CharCount>
            {description.length}/{maxLength}
          </CharCount>
        </TextareaWrapper>
      </CourseHeader>
      <ListsContainer>
        <List>
          <Title>
            <BsBookmarkStar />
            <span>MY 북마크 리스트</span>
          </Title>
          <ScrapList>
            {scrapData && scrapData.length > 0 ? (
              scrapData.map((item, index) => {
                const isDisabled = recommendList.some(
                  (recommended) => recommended.contentId === item.contentId
                );
                return (
                  <ScrapItem
                    key={index}
                    disabled={isDisabled}
                    onClick={() => handleScrapItemClick(item)}
                  >
                    <ItemWrapper>
                      <ImageWrapper>
                        <Image
                          src={item.image ? item.image : DefaultImg}
                          alt={item.title}
                        />
                      </ImageWrapper>
                      <TextWrapper>
                        <CategoryLogo
                          src={item.categoryLogo}
                          alt="Category Logo"
                        />
                        <TitleText>{item.title}</TitleText>
                        <AddressText>{item.address}</AddressText>
                      </TextWrapper>
                      <IconWrapper>
                        <BsBookmarkFill />
                      </IconWrapper>
                    </ItemWrapper>
                  </ScrapItem>
                );
              })
            ) : selectedSpot !== "전체" ? (
              <EmptyMessage>북마크한 리스트가 없습니다.</EmptyMessage>
            ) : (
              <EmptyMessage>추천할 구장을 선택해주세요.</EmptyMessage>
            )}
          </ScrapList>
        </List>
        <Arrow>
          <GrNext />
        </Arrow>
        <List>
          <Title>
            <IoMdCheckboxOutline />
            <span>추천행 리스트</span>
          </Title>
          <RecommendList>
            {recommendList.length > 0 ? (
              recommendList.map((item, index) => (
                <RecommendItem key={index}>
                  <ItemWrapper>
                    <ImageWrapper>
                      <Image src={item.image ? item.image : DefaultImg} />
                    </ImageWrapper>
                    <TextWrapper>
                      <CategoryLogo
                        src={item.categoryLogo}
                        alt="Category Logo"
                      />
                      <TitleText>{item.title}</TitleText>
                      <AddressText>{item.address}</AddressText>
                    </TextWrapper>
                    <IconWrapper2>
                      <FaRegTrashAlt
                        onClick={() => handleRecommendItemClick(item.contentId)}
                      />
                    </IconWrapper2>
                  </ItemWrapper>
                </RecommendItem>
              ))
            ) : (
              <EmptyMessage>추천행 리스트가 없습니다.</EmptyMessage>
            )}
          </RecommendList>
        </List>
      </ListsContainer>
    </Container>
  );
};

export default CreateCourse;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 18px;
    width: 75vw;
  }
`;

const CourseHeader = styled.div`
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  width: 100%;

  @media (max-width: 480px) {
    margin: 10px 0;
  }
`;

const TextareaWrapper = styled.div`
  position: relative;
  width: 93%;
  max-width: 700px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid #fff;
    box-shadow: 0 0 5px rgba(131, 199, 255, 0.5);
  }

  &::placeholder {
    color: #888;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
    font-size: 1rem;
    height: 100px;
  }
`;

const CharCount = styled.div`
  position: absolute;
  bottom: 10px;
  right: 1px;
  font-size: 0.8rem;
  color: #aaa;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    bottom: 5px;
    right: 1px;
  }
`;

const Input = styled.input`
  width: 93%;
  max-width: 700px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border: 1px solid #fff;
    box-shadow: 0 0 5px rgba(131, 199, 255, 0.5);
  }

  &::placeholder {
    color: #888;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 13px 10px;
    margin-left: -10px;
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const CourseTitleLabel = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 6px;
  }
`;

const ListsContainer = styled.div`
  max-width: 78vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    max-width: 80vw;
    margin-top: 3vh;
    gap: 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const List = styled.div`
  width: 300px;
  max-height: 500px;
  overflow-y: auto;
  background-color: #1f1f1f;
  border-radius: 10px;
  padding: 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1f1f1f;
  }
  @media (max-width: 768px) {
    width: 400px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 23px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;

  span {
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const ScrapList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ScrapItem = styled.li<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#2a2a2a" : "#444")};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.02)")};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    padding: 10px 0;
  }
`;

const RecommendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RecommendItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #333;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    padding: 10px 0;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 15px;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  flex-grow: 1;
`;
const CategoryLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
`;

const TitleText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  width: 185px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    width: 140px;
  }
`;

const AddressText = styled.div`
  font-size: 0.9rem;
  color: #aaa;
  width: 180px;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    width: 140px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #2f2f2f;
  border-radius: 50%;

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1rem;
  color: #aaa;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Arrow = styled.div`
  font-size: 2rem;
  color: #fff;
  margin: auto;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const IconWrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #2f2f2f;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  svg {
    color: #fff;
    transition: color 0.3s ease;
  }

  &:hover {
    background-color: #ff4d4f;
    cursor: pointer;

    svg {
      color: #fff;
    }
  }

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
  }
`;
