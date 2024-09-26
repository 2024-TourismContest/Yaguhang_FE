// MycoursePage.tsx
import styled from "styled-components";
import User from "../../components/mycourse/User";
import { Filter } from "../../components/recommend/filter";
import { useEffect, useState } from "react";
import { Button as OriginalButton } from "../../components/button/Button";
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
  const [description, setDescription] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();
  const handleSpotChange = (spot: string) => {
    setSelectedSpot(spot);
    setStadium(spot);
  };

  // selectedSpot 변경 시 스크랩 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (selectedSpot && selectedSpot !== "전체") {
        try {
          const data = await fetchScrapData(selectedSpot);
          setScrapData(data?.scrapAddressSpots || []);
        } catch (error) {
          console.error("Error fetching scrap data:", error);
          setScrapData([]);
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
      toast.error("구장과 추천행 제목을 입력해주세요.");
      return;
    }

    if (contentIdList.length === 0) {
      toast.error("추천행 코스에 추가할 스크랩 항목을 선택해주세요.");
      return;
    }

    try {
      const response = await createCourse(
        stadium,
        title,
        description,
        contentIdList
      );
      console.log("Recommend course created:", response);
      toast.success("추천행 코스를 생성했습니다.");
      navigate("/region");
      setStadium("");
      setTitle("");
      setDescription("");
      setContentIdList([]);
    } catch (error) {
      console.error("Failed to create recommend course:", error);
      toast.error("추천행 코스 생성에 실패했습니다.");
    }
  };

  const handleMouseEnter = () => {
    if (!stadium || !title || contentIdList.length === 0) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <Container>
        <Title>
          <Emoji>⛳️</Emoji> 나의 <Highlight>추천행</Highlight> 코스 만들기
        </Title>
        <Description>
          나만의 원정 경기 계획, 북마크한 경기장과 맛집을 추천행 리스트에 담아
          팬들과 공유해보세요!
        </Description>
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
          description={description}
          setDescription={setDescription}
          selectedSpot={selectedSpot}
        />
        <TooltipWrapper>
          <FixedButton
            bgColor="#000"
            border="2px solid #fff"
            color="#fff"
            text="나의 추천행 코스 생성하기 >"
            fontWeight="bold"
            hoverColor="#a7cfec"
            hoverBorderColor="#a7cfec"
            onClick={handleCreateCourse}
            disabled={!stadium || !title || contentIdList.length === 0}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {showTooltip && (
            <Tooltip>
              모든 필드를 채우고 스크랩 항목을 선택해야 생성할 수 있습니다.
            </Tooltip>
          )}
        </TooltipWrapper>
      </Container>
    </>
  );
};

export default MycoursePage;

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  min-height: 70vh;
  margin: 150px auto;
  position: relative;
  padding-bottom: 100px;
  // background-color: red;
`;
const Title = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 2vh;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #fff;
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
  border-radius: 10px;
  padding: 15px 20px;
  font-family: "Noto Sans", sans-serif;
  margin-bottom: 7vh;
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
  max-width: 60vw;
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
  min-width: 30vw;
  max-width: 400px;
  border-top: 1px dashed #d9d9d9;
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

  @media (max-width: 1024px) {
    width: 40px;
    height: 25px;
    font-size: 16px;
    padding: 5px 8px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 14px;
    padding: 5px 8px;
  }
`;

const FixedButton = styled(OriginalButton)<{ disabled: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 10px 20px;
  z-index: 1000;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#a7cfec")};
    border-color: ${({ disabled }) => (disabled ? "#fff" : "#a7cfec")};
  }
`;
const TooltipWrapper = styled.div`
  position: fixed; /* 툴팁과 버튼을 함께 이동시키기 위해 고정 */
  bottom: 60px; /* 버튼에서 약간 위로 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  z-index: 1001;
`;

const Tooltip = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  white-space: nowrap;
  z-index: 1001;
  opacity: 0; /* 처음에 투명하게 설정 */
  visibility: hidden; /* 처음에 숨김 */
  transition: opacity 0.3s ease, visibility 0.3s ease;

  /* TooltipWrapper에 호버 시 Tooltip 표시 */
  ${TooltipWrapper}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
