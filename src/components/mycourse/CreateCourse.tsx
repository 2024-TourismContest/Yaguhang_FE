import { useState } from "react";
import styled from "styled-components";
import { createCourse } from "../../apis/recommend";
import { toast } from "react-toastify";
import { BsBookmarkFill, BsBookmarkStar } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { IoMdCheckboxOutline } from "react-icons/io";

interface ScrapData {
  contentId: number;
  image: string;
  title: string;
  address: string;
  categoryLogo: string;
}

interface CreateCourseProps {
  scrapData: ScrapData[];
  contentIdList: number[]; // 상태 props
  setContentIdList: React.Dispatch<React.SetStateAction<number[]>>; // 상태 변경 함수 props
  stadium: string; // stadium 상태
  setStadium: React.Dispatch<React.SetStateAction<string>>; // stadium 상태 업데이트 함수
  title: string; // title 상태
  setTitle: React.Dispatch<React.SetStateAction<string>>; // title 상태 업데이트 함수
}

const CreateCourse: React.FC<CreateCourseProps> = ({
  scrapData,
  contentIdList,
  setContentIdList,
  stadium,
  setStadium,
  title,
  setTitle,
}) => {
  const [recommendList, setRecommendList] = useState<ScrapData[]>([]);

  // 북마크 아이템을 추천행 리스트에 추가하는 함수
  const handleScrapItemClick = (item: ScrapData) => {
    if (!recommendList.find((i) => i.contentId === item.contentId)) {
      setRecommendList([...recommendList, item]);
      setContentIdList([...contentIdList, item.contentId]);
    }
  };

  // 추천행 리스트에서 아이템을 제거하는 함수
  const handleRecommendItemClick = (contentId: number) => {
    const updatedList = recommendList.filter(
      (item) => item.contentId !== contentId
    );
    setRecommendList(updatedList);
    setContentIdList(updatedList.map((item) => item.contentId));
  };

  return (
    <Container>
      <CourseHeader>
        <p>추천행 제목 : </p>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // title 상태 변경
        />
      </CourseHeader>
      <ListsContainer>
        <List>
          <Title>
            <BsBookmarkStar />
            <span>MY 북마크 리스트</span>
          </Title>
          <ScrapList>
            {scrapData.length > 0 ? (
              scrapData.map((item, index) => (
                <ScrapItem
                  key={index}
                  onClick={() => handleScrapItemClick(item)}
                >
                  <ItemWrapper>
                    <ImageWrapper>
                      <Image src={item.image} alt={item.title} />
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
              ))
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
                      <Image src={item.image} alt={item.title} />
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
                      <FaRegTrashAlt
                        onClick={() => handleRecommendItemClick(item.contentId)}
                      />
                    </IconWrapper>
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
`;

const CourseHeader = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  color: #fff;
  border-radius: 5px;
  background-color: #000;
`;

const ListsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
`;

const List = styled.div`
  width: 300px;
  max-height: 500px;
  overflow-y: auto;
  background-color: #1f1f1f;
  border-radius: 10px;
  padding: 20px;
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
`;

const ScrapList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ScrapItem = styled.li`
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
`;

const TitleText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const AddressText = styled.div`
  font-size: 0.9rem;
  color: #aaa;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #2f2f2f;
  border-radius: 50%;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1rem;
  color: #aaa;
`;

const Arrow = styled.div`
  font-size: 2rem;
  color: #fff;
  margin: auto;
`;
