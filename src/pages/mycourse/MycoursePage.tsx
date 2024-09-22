import styled from "styled-components";
import User from "../../components/mycourse/User";
import { Filter } from "../../components/recommend/filter";
import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import CreateCourse from "../../components/mycourse/CreateCourse";
import { fetchScrapData, createCourse } from "../../apis/recommend";
import { toast } from "react-toastify";

const MycoursePage = () => {
  const [selectedSpot, setSelectedSpot] = useState("전체");
  const [scrapData, setScrapData] = useState<any[]>([]);
  const [contentIdList, setContentIdList] = useState<number[]>([]);
  const [stadium, setStadium] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const navigate = useNavigate();
  const handleSpotChange = (spot: string) => {
    setSelectedSpot(spot);
    setStadium(spot);
  };

  const handleButtonClick = (page: string) => {
    navigate(`/${page}`);
  };

  // selectedSpot 변경 시 스크랩 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (selectedSpot && selectedSpot !== "전체") {
        try {
          const data = await fetchScrapData(selectedSpot);
          setScrapData(data.scrapAddressSpots);
        } catch (error) {
          console.error("Error fetching scrap data:", error);
        }
      } else {
        setScrapData([]);
      }
    };

    fetchData();
  }, [selectedSpot]);

  // 추천행 코스 생성 함수
  const handleCreateCourse = async () => {
    if (!stadium || !title) {
      toast.error("Stadium과 Title을 입력해주세요.");
      return;
    }

    if (contentIdList.length === 0) {
      toast.error("추천행 코스에 추가할 스크랩 항목을 선택해주세요.");
      return;
    }

    try {
      const response = await createCourse(stadium, title, contentIdList);
      console.log("Recommend course created:", response);
      toast.success("추천행 코스를 생성했습니다.");
      navigate("/region");
      setStadium("");
      setTitle("");
      setContentIdList([]);
    } catch (error) {
      console.error("Failed to create recommend course:", error);
      toast.error("추천행 코스 생성에 실패했습니다.");
    }
  };

  return (
    <>
      <Container>
        <Title>
          <Emoji>⛳️</Emoji> 나의 <Highlight>추천행</Highlight> 코스 만들기
        </Title>
        <User />
        <CategoryContainer>
          <FilterWrapper>
            <Filter
              selectedSpot={selectedSpot}
              handleSpotChange={handleSpotChange}
            />
          </FilterWrapper>
          <DotLineContainer>
            <DotLine />
            <Dot />
          </DotLineContainer>
          <Local>{selectedSpot}</Local>
        </CategoryContainer>
        <CreateCourse
          scrapData={scrapData}
          contentIdList={contentIdList}
          setContentIdList={setContentIdList}
          stadium={stadium}
          setStadium={setStadium}
          title={title}
          setTitle={setTitle}
        />
        {/* contentIdList 상태 전달 */}
        <Button
          bgColor="#000"
          border="2px solid #fff"
          color="#fff"
          text="나의 추천행 코스 생성하기 >"
          fontWeight="bold"
          hoverColor="#a7cfec"
          hoverBorderColor="#a7cfec"
          onClick={handleCreateCourse} // 버튼 클릭 시 handleCreateCourse 함수 실행
        />
      </Container>
    </>
  );
};

export default MycoursePage;

const Container = styled.div`
  width: 100%;
  max-width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100vh;
  margin: 0 auto;
`;
const Title = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 7vh;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
`;

const Emoji = styled.span`
  font-size: 2.5rem;
  position: relative;
  top: 5px;
`;

const Highlight = styled.span`
  color: #83c7ff;
  text-decoration: underline;
`;

const CategoryContainer = styled.div`
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DotLineContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: 20px;
`;

const DotLine = styled.div`
  width: 400px;
  border-top: 1px dashed #ccc;
`;

const Dot = styled.div`
  position: absolute;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: #ccc;
  border-radius: 50%;
`;

const Local = styled.div`
  width: 40px;
  height: 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  padding: 10px 20px;
`;
