import React, { useState } from "react";
import styled from "styled-components";
import left from "../../assets/icons/left.png";
import right from "../../assets/icons/right.png";

export interface MoreImageProps {
  images: string[];
  id?: string;
}

const MoreImage: React.FC<MoreImageProps> = ({ images, id }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const imagesPerPage = 4;
  const indexOfLastImage = (currentPage + 1) * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const nextPage = () => {
    if (indexOfLastImage < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id={id}>
      <Section>
        <h1>사진 정보</h1>
        <PrevButton onClick={prevPage} disabled={currentPage === 0}>
          <img src={left} alt="이전" />
        </PrevButton>
        <ImageContainer>
          {currentImages.map((image, index) => (
            <ImageItem key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </ImageContainer>
        <NextButton
          onClick={nextPage}
          disabled={indexOfLastImage >= images.length}
        >
          <img src={right} alt="다음" />
        </NextButton>
      </Section>
    </div>
  );
};

export default MoreImage;

const Section = styled.div`
  position: relative;
  flex: 1 1 45%;
  padding: 0rem 7rem 4rem 7rem;
  flex-direction: row;
  text-align: center;
  margin-top: 8vh;

  h1 {
    color: #ffffff;
    font-size: 1.6rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ImageItem = styled.img`
  width: 230px;
  height: 23vh;
  object-fit: cover;
  border-radius: 25px;
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
`;

const PrevButton = styled(PaginationButton)`
  left: 2rem;
`;

const NextButton = styled(PaginationButton)`
  right: 2rem;
`;
