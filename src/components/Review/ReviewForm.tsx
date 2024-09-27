import { useRef, useState } from "react";
import styled from "styled-components";
import { IoImageOutline } from "react-icons/io5";
import { postReview, uploadToAws } from "../../apis/review"; // api에서 uploadToAws 가져오기
import { toast } from "react-toastify";

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

  // 이미지 선택 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.files가 null이 아닌지 확인 후 배열로 변환
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // 리뷰 제출
  const handleReviewSubmit = async () => {
    if (!newReview.trim() || rating === 0) {
      toast.error("별점과 리뷰를 입력해주세요!");
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
      toast.error("로그인이 필요합니다.");
      console.error("리뷰 작성 오류:", error);
    }
  };

  return (
    <ReviewInputContainer>
      <RatingContainer>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= rating}
            onClick={() => setRating(star)}
          >
            ★
          </Star>
        ))}
      </RatingContainer>
      <ReviewInput
        placeholder="리뷰를 입력하세요. (최대 300자)"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
      />
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

      {images.length > 0 && (
        <ImagePreviewContainer>
          {images.map((image, index) => (
            <PreviewImage
              key={index}
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
            />
          ))}
        </ImagePreviewContainer>
      )}
    </ReviewInputContainer>
  );
};

export default ReviewForm;

const ReviewInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 70vw;
  margin: 1rem auto;

  @media (max-width: 1024px) {
    width: 650px;
    height: 100px;
  }

  @media (max-width: 768px) {
    width: 400px;
    height: 70px;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Star = styled.span<{ filled: boolean }>`
  font-size: 1.4rem;
  color: ${(props) => (props.filled ? "#FFD700" : "#ccc")};
  cursor: pointer;
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
  resize: vertical;
  outline: none;

  @media (max-width: 1024px) {
    width: 98%;
    min-height: 25%;
    height: 100px;
  }

  @media (max-width: 768px) {
    min-height: 6%;
    width: 98%;
    height: 80px;
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
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 23px;
  }

  input {
    display: none;
  }

  &:hover {
    color: #007bff;
  }
`;

const SubmitButton = styled.button`
  padding: 0.4rem 0.7rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (max-width: 1024px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
`;

const PreviewImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
`;
