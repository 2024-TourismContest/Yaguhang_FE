import { useState } from "react";
import styled from "styled-components";
import { IoImageOutline } from "react-icons/io5";
import { postReview } from "../../apis/review"; // 리뷰 작성 API 호출 함수 임포트
import { toast } from "react-toastify";

interface ReviewFormProps {
  contentId: number;
  stadiumId: number; // stadiumId 추가
  onSubmitSuccess: () => void; // 성공 시 상위 컴포넌트에 알릴 수 있도록 콜백 추가
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  contentId,
  stadiumId, // stadiumId 추가
  onSubmitSuccess,
}) => {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);

  // 이미지 선택 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // 선택한 파일을 상태로 저장
    }
  };
  //리뷰 제출
  const handleReviewSubmit = async () => {
    if (newReview.trim() === "" || rating === 0) {
      toast.error("별점과 리뷰를 입력해주세요!");
      return;
    }

    const reviewData = {
      star: rating,
      content: newReview,
      stadiumId: stadiumId,
      images: images.map((image) => URL.createObjectURL(image)),
    };

    try {
      await postReview(contentId, reviewData);
      toast.success("리뷰가 성공적으로 작성되었습니다!");
      setNewReview("");
      setRating(0);
      setImages([]);
      onSubmitSuccess(); // 리뷰 작성 성공 시 부모 컴포넌트에 알림
    } catch (error) {
      toast.error("리뷰 작성에 실패했습니다.");
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
        <CameraIcon>
          <IoImageOutline />
          <input type="file" onChange={handleImageUpload} />
        </CameraIcon>
        <SubmitButton onClick={handleReviewSubmit}>등록</SubmitButton>
      </SubmitContainer>
      {/* 선택된 이미지 미리보기 */}
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
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background-color: red;
  max-width: 50vw;
`;

const RatingContainer = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
`;

const Star = styled.span<{ filled: boolean }>`
  font-size: 1.25rem;
  color: ${(props) => (props.filled ? "#FFD700" : "#555")};
  cursor: pointer;
`;

const ReviewInput = styled.textarea`
  width: 100%;
  border: none;
  color: white;
  font-size: 0.875rem;
  outline: none;
  background-color: #000;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CameraIcon = styled.div`
  font-size: 1.25rem;
  cursor: pointer;
  margin-right: 0.75rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 12px;
  background-color: #fff;
  color: black;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.875rem;
`;
const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #fff;
`;
