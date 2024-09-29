import { useState, useEffect } from "react";
import styled from "styled-components";
import left from "../../assets/icons/left.png";
import right from "../../assets/icons/right.png";
export interface MoreImageProps {
  images: string[];
  id?: string;
}

const MoreImage: React.FC<MoreImageProps> = ({ images, id }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(4); // 기본값 4개
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 선택된 이미지

  // 화면 크기에 따라 이미지 개수를 동적으로 조정하는 함수
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setImagesPerPage(2); // 모바일 사이즈에서는 2개의 이미지
    } else {
      setImagesPerPage(4); // 기본 사이즈에서는 4개의 이미지
    }
  };

  useEffect(() => {
    // 초기 화면 크기에 따라 이미지 개수 설정
    handleResize();

    // 화면 크기 변경시 이미지 개수 변경
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 빈 문자열로 된 이미지를 필터링
  const validImages = images.filter((image) => image.trim() !== "");

  const indexOfLastImage = (currentPage + 1) * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = validImages.slice(indexOfFirstImage, indexOfLastImage);

  const nextPage = () => {
    if (indexOfLastImage < validImages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 이미지 클릭 시 모달 열기
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div id={id}>
      <Section>
        <h1>사진 정보</h1>
        <PrevButton onClick={prevPage} disabled={currentPage === 0}>
          <img src={left} alt="이전" />
        </PrevButton>
        <ImageContainer>
          {validImages.length > 0 ? (
            currentImages.map((image, index) => (
              <ImageItem
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(image)} // 이미지 클릭 시 모달 열기
              />
            ))
          ) : (
            <EmptyMessage>사진 정보를 준비중입니다.</EmptyMessage>
          )}
        </ImageContainer>
        <NextButton
          onClick={nextPage}
          disabled={indexOfLastImage >= validImages.length}
        >
          <img src={right} alt="다음" />
        </NextButton>
      </Section>

      {/* 모달 */}
      {isModalOpen && selectedImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalImage src={selectedImage} alt="확대 이미지" />
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default MoreImage;

const Section = styled.div`
  position: relative;
  flex: 1 1 45%;
  padding: 0rem 7rem 4rem 7rem;
  text-align: center;
  margin-top: 5vh;

  h1 {
    color: #ffffff;
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
    margin-top: 3vh;

    h1 {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
    h1 {
      font-size: 0.7rem;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const ImageItem = styled.img`
  width: 180px;
  height: 20vh;
  object-fit: cover;
  border-radius: 25px;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 160px;
    height: 18vh;
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 15vh;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 60px;
  }
`;

const PaginationButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  img {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 768px) {
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    img {
      width: 1rem;
      height: 1rem;
    }
  }
`;

const PrevButton = styled(PaginationButton)`
  left: 2rem;

  @media (max-width: 768px) {
    left: 1rem;
  }
`;

const NextButton = styled(PaginationButton)`
  right: 2rem;

  @media (max-width: 768px) {
    right: 1rem;
  }
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

/* 모달 스타일 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: zoom-out;
`;

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90%;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;
