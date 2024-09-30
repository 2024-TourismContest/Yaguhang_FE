import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoImageOutline } from "react-icons/io5";
import { postReview, uploadToAws } from "../../apis/review"; // api에서 uploadToAws 가져오기
import { toast } from "react-toastify";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MouseEvent } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 참조
  const textareaRef = useRef<HTMLTextAreaElement>(null); // textarea 참조

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
      };

      // 리뷰 작성
      await postReview(contentId, reviewData);

      toast.success("리뷰가 성공적으로 작성되었습니다!");
      setNewReview("");
      setRating(0);
      setImages([]);
      onSubmitSuccess();
    } catch (error) {
      toast.error("이미지파일 용량이 너무 큽니다!");
      console.error("리뷰 작성 오류:", error);
    }
  };

  return (
    <ReviewInputContainer>
      <RatingContainer>{renderStars()}</RatingContainer>
      <ReviewInput
        ref={textareaRef}
        placeholder="리뷰를 입력하세요."
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
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
    mibn-height: 170px;
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
    width:100%
    min-height:70px;
  }

  @media (max-width: 768px) {
    width:100%
    min-height:70px;
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
