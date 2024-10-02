import { MouseEvent, useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import styled from "styled-components";
import { postReview, uploadToAws } from "../../apis/review";
import { tagData } from "./tagData";
import ReviewTag from "./ReviewTag";
import { useLocation } from "react-router-dom";

interface ReviewFormProps {
  contentId: number;
  stadiumId: number;
  onSubmitSuccess: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  contentId,
  stadiumId,
  onSubmitSuccess,
}) => {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const location = useLocation(); // URL에서 카테고리 추출
  const urlCategory = decodeURIComponent(
    location.pathname.split("/")[2]
  ) as keyof typeof tagData;

  console.log("URL Category:", urlCategory);

  useEffect(() => {
    // 텍스트 변경 시마다 textarea 높이 자동 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // scrollHeight로 높이 조정
    }
  }, [newReview]); // newReview 값이 변경될 때마다 동작

  // 이미지 선택 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.files가 null이 아닌지 확인 후 배열로 변환
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  // 이미지 삭제
  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleStarClick = (e: MouseEvent, index: number) => {
    const starElement = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - starElement.left;

    // 클릭한 위치가 별의 중간보다 왼쪽이면 반 개로, 오른쪽이면 전체로 설정
    if (clickPosition < starElement.width / 2) {
      setRating(index + 0.5);
    } else {
      setRating(index + 1);
    }
  };

  // 별점 아이콘 렌더링 함수
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            style={{ display: "inline-block" }}
            onClick={(e) => handleStarClick(e, i)}
          >
            {i < fullStars ? (
              <FaStar />
            ) : (
              <>
                {i === fullStars && hasHalfStar ? (
                  <FaStarHalfAlt />
                ) : (
                  <FaRegStar />
                )}
              </>
            )}
          </div>
        ))}
      </>
    );
  };

  // 리뷰 제출
  const handleReviewSubmit = async () => {
    if (!newReview.trim() || rating === 0) {
      toast.error("별점과 리뷰를 모두 입력해주세요!");
      return;
    }

    try {
      // 이미지 업로드
      const uploadedImageUrls = await Promise.all(
        images.map((image) => uploadToAws(image))
      );

      const reviewData = {
        star: rating,
        content: newReview,
        stadiumId,
        images: uploadedImageUrls,
        tags: selectedTags,
      };

      // 리뷰 작성
      await postReview(contentId, reviewData);

      toast.success("리뷰가 성공적으로 작성되었습니다!");
      setNewReview("");
      setRating(0);
      setImages([]);
      setSelectedTags([]);
      onSubmitSuccess();
    } catch (error) {
      toast.error("이미지파일 용량이 너무 큽니다!");
      console.error("리뷰 작성 오류:", error);
    }
  };

  // URL에서 추출한 카테고리를 기준으로 태그 데이터 결정
  const currentTags = tagData[urlCategory] || [];

  return (
    <ReviewInputContainer>
      <RatingContainer>{renderStars()}</RatingContainer>
      <ReviewInput
        ref={textareaRef}
        placeholder="리뷰를 입력하세요."
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
      />

      <ReviewTag
        tags={currentTags} // 선택된 카테고리에 맞는 태그 데이터를 전달
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      {images.length > 0 && (
        <ImagePreviewContainer>
          {images.map((image, index) => (
            <ImageWrapper key={index}>
              <PreviewImage
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
              />
              <DeleteImageButton onClick={() => handleImageDelete(index)}>
                삭제
              </DeleteImageButton>
            </ImageWrapper>
          ))}
        </ImagePreviewContainer>
      )}
      <SubmitContainer>
        <CameraIcon onClick={handleCameraClick}>
          <IoImageOutline />
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </CameraIcon>
        <SubmitButton onClick={handleReviewSubmit}>등록</SubmitButton>
      </SubmitContainer>
    </ReviewInputContainer>
  );
};

export default ReviewForm;
const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DeleteImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  cursor: pointer;
  border-radius: 50%;
`;
const ReviewInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 70vw;
  margin: 1rem auto;
  min-height: 180px;
  height: auto;
  overflow: visible;

  @media (max-width: 1024px) {
    width: 650px;
    min-height: 180px;
  }

  @media (max-width: 768px) {
    width: 450px;
    min-height: 170px;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  font-size: 1.4rem;
  color: #ffd700;
  cursor: pointer;

  svg {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const ReviewInput = styled.textarea`
  width: 99%;
  min-height: 70%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: #dfdfdf;
  background-color: #000;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: none;
  overflow-y: hidden;
  outline: none;
  line-height: 1.5;

  @media (max-width: 1024px) {
    width: 98%;
    min-height: 25%;
    height: auto;
  }

  @media (max-width: 768px) {
    min-height: 6%;
    width: 98%;
    height: auto;
    font-size: 12px;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const CameraIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;

  @media (max-width: 1024px) {
    font-size: 25px;
  }

  @media (max-width: 768px) {
    font-size: 25px;
  }

  input {
    display: none;
  }

  &:hover {
    color: #ccc;
  }
`;

const SubmitButton = styled.button`
  padding: 0.4rem 0.7rem;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (max-width: 1024px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 11px;
  }

  &:hover {
    background-color: #ccc;
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  flex-wrap: wrap;
  @media (max-width: 1024px) {
    width: 100%;
    min-height: 70px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: 70px;
  }
`;

const PreviewImage = styled.img`
  width: 130px;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 1024px) {
    width: 100px;
    height: 110px;
    object-fit: cover;
    margin-top: -40px;
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin-top: 5px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 70px;
  }
`;
