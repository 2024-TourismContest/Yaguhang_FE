import {
  FaRegHeart,
  FaHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import styled from "styled-components";
import {
  deleteReview,
  fetchReviews,
  toggleLikeOnServer,
  updateReview,
  uploadToAws,
} from "../../apis/review";
import { useEffect, useRef, useState, MouseEvent } from "react";

interface ReviewListProps {
  contentId: number;
  sort: string;
  reviews: any[];
}

interface ReviewData {
  user: {
    userId: number;
    nickname: string;
    image: string;
    fanTeam: string;
  };
  reviewId: number;
  isMine: boolean;
  isLiked: boolean;
  star: number;
  likeCount: number;
  createdAt: string;
  content: string;
  images: string[];
}

const ReviewList: React.FC<ReviewListProps> = ({ contentId, sort }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null); // 수정 상태를 관리할 변수
  const [editedContent, setEditedContent] = useState<string>("");
  const [editedStar, setEditedStar] = useState<number>(0); // 수정할 별점 상태
  const [editedImages, setEditedImages] = useState<string[]>([]); // 기존 이미지 상태
  const [newImages, setNewImages] = useState<File[]>([]); // 새로 추가한 이미지 상태
  const [isEditing, setIsEditing] = useState<boolean>(false); // 수정 모드 상태 추가
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [currentImage, setCurrentImage] = useState<string | null>(null); // 현재 모달에 표시할 이미지

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const fetchedReviews = await fetchReviews(contentId, sort);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    loadReviews();
  }, [contentId, sort]);

  // 리뷰 삭제
  const handleDelete = async (reviewId: number) => {
    const confirmDelete = window.confirm("이 리뷰를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteReview(reviewId);
      const fetchedReviews = await fetchReviews(contentId, sort);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
    }
  };

  // 리뷰 수정 시작 시 기존 데이터 로드
  const handleEditClick = (review: ReviewData) => {
    setEditingReviewId(review.reviewId); // 수정할 리뷰 ID 설정
    setEditedContent(review.content); // 기존 리뷰 내용을 폼에 표시
    setEditedStar(review.star); // 기존 별점 표시
    setEditedImages(review.images); // 기존 이미지 표시
    setIsEditing(true); // 수정 모드로 전환
  };

  // 리뷰 수정 취소
  const handleCancelEdit = () => {
    setEditingReviewId(null); // 수정할 리뷰 ID 초기화
    setIsEditing(false); // 수정 모드 종료
  };

  // 이미지 선택 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages([...newImages, ...Array.from(e.target.files)]);
    }
  };

  const handleImageDelete = (index: number, isNew: boolean) => {
    if (isNew) {
      setNewImages(newImages.filter((_, i) => i !== index));
    } else {
      setEditedImages(editedImages.filter((_, i) => i !== index));
    }
  };

  const handleEditSave = async (reviewId: number) => {
    try {
      const uploadedImageUrls = await Promise.all(
        newImages.map((image) => uploadToAws(image))
      );

      const updatedImages = [...editedImages, ...uploadedImageUrls]; // 기존 이미지 + 새로 추가한 이미지

      await updateReview(reviewId, {
        content: editedContent,
        star: editedStar,
        images: updatedImages,
      });

      setEditingReviewId(null);
      setIsEditing(false); // 수정 모드 종료
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.reviewId === reviewId
            ? {
                ...review,
                content: editedContent,
                star: editedStar,
                images: updatedImages,
              }
            : review
        )
      );
      setNewImages([]);
    } catch (error) {
      console.error("리뷰 수정 중 오류 발생:", error);
    }
  };

  // 리뷰 좋아요
  const handleLikeToggle = async (reviewId: number) => {
    const updatedLikeCount = await toggleLikeOnServer(reviewId);

    if (updatedLikeCount !== null) {
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.reviewId === reviewId
            ? {
                ...review,
                isLiked: !review.isLiked,
                likeCount: updatedLikeCount,
              }
            : review
        )
      );
    }
  };

  // 이미지 클릭 시 모달 열기
  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  // 별점 클릭 처리 함수
  const handleStarClick = (e: MouseEvent, index: number) => {
    const starElement = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - starElement.left;

    const newRating =
      clickPosition < starElement.width / 2 ? index + 0.5 : index + 1;
    setEditedStar(newRating);
  };

  // 별점 렌더링 함수
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} color="#FFD700" />
        ))}
        {halfStar && <FaStarHalfAlt color="#FFD700" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaRegStar key={`empty-${i}`} color="#FFD700" />
        ))}
        <span style={{ marginLeft: "8px", color: "#fff" }}>
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <ListContainer>
      {reviews.length === 0 ? (
        <EmptyMessage>
          아직 리뷰가 없어요. 방문하고 리뷰를 남겨보세요!
        </EmptyMessage>
      ) : (
        reviews.map((review) => (
          <ReviewItem key={review.reviewId}>
            <ReviewHeader>
              <UserInfo>
                <div style={{ position: "relative" }}>
                  <UserImage src={review.user.image} alt="user" />
                  <FanTeamImage src={review.user.fanTeam} alt="fanTeam" />
                </div>
                <UserDetails>
                  <Nickname>{review.user.nickname}</Nickname>
                  <ReviewDate>
                    {new Date(review.createdAt).toLocaleString()}
                  </ReviewDate>
                </UserDetails>
              </UserInfo>
              <Rating>{renderStars(review.star)}</Rating>
            </ReviewHeader>

            {editingReviewId === review.reviewId ? (
              <EditContainer>
                <StarContainer>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      filled={i < Math.floor(editedStar)}
                      onClick={(e) => handleStarClick(e, i)}
                    >
                      {i < Math.floor(editedStar) ? (
                        <FaStar color="#FFD700" />
                      ) : i === Math.floor(editedStar) &&
                        editedStar % 1 !== 0 ? (
                        <FaStarHalfAlt color="#FFD700" />
                      ) : (
                        <FaRegStar color="#FFD700" />
                      )}
                    </Star>
                  ))}
                </StarContainer>
                <EditInput
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />

                <ImagesWrapper>
                  <ExistingImagesContainer>
                    {editedImages.map((image, index) => (
                      <ImageWrapper key={index}>
                        <ReviewImage
                          src={image}
                          alt={`Review Image ${index}`}
                        />
                        <DeleteImageButton
                          onClick={() => handleImageDelete(index, false)}
                        >
                          삭제
                        </DeleteImageButton>
                      </ImageWrapper>
                    ))}
                  </ExistingImagesContainer>

                  {/* 새 이미지 추가 기능 */}
                  <NewImagesContainer>
                    {newImages.map((image, index) => (
                      <ImageWrapper key={index}>
                        <ReviewImage
                          src={URL.createObjectURL(image)}
                          alt={`New Image ${index}`}
                        />
                        <DeleteImageButton
                          onClick={() => handleImageDelete(index, true)}
                        >
                          삭제
                        </DeleteImageButton>
                      </ImageWrapper>
                    ))}
                    <AddImageButton
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <IoImageOutline /> {/* 이미지 아이콘 표시 */}
                    </AddImageButton>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </NewImagesContainer>
                </ImagesWrapper>

                <ButtonContainer>
                  <SaveButton onClick={() => handleEditSave(review.reviewId)}>
                    저장
                  </SaveButton>
                  <CancelButton onClick={handleCancelEdit}>
                    수정 취소
                  </CancelButton>
                </ButtonContainer>
              </EditContainer>
            ) : (
              <>
                <Content>{review.content}</Content>

                {review.images.length > 0 && (
                  <ImagesContainer>
                    {review.images.map((image, index) => (
                      <ReviewImage
                        key={index}
                        src={image}
                        alt={`Review Image ${index + 1}`}
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </ImagesContainer>
                )}
              </>
            )}

            {!isEditing && ( // 수정 모드가 아닐 때만 수정/삭제 버튼을 표시
              <ReviewFooter>
                <Likes onClick={() => handleLikeToggle(review.reviewId)}>
                  {review.isLiked ? <FaHeart /> : <FaRegHeart />}{" "}
                  {review.likeCount}명에게 도움이 된 후기
                </Likes>
                {review.isMine && (
                  <Actions>
                    <EditButton onClick={() => handleEditClick(review)}>
                      수정
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(review.reviewId)}>
                      삭제
                    </DeleteButton>
                  </Actions>
                )}
              </ReviewFooter>
            )}
          </ReviewItem>
        ))
      )}

      {/* 이미지 확대 모달 */}
      {isModalOpen && currentImage && (
        <ImageModal onClick={handleCloseModal}>
          <ModalImage src={currentImage} alt="확대 이미지" />
        </ImageModal>
      )}
    </ListContainer>
  );
};

export default ReviewList;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: zoom-out;
`;

const ModalImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  border-radius: 10px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 70vw;
  margin: 0 auto;
  margin-bottom: 20vh;
`;

const ReviewItem = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-bottom: 0.5px dashed #ccc;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  font-size: 1rem;
  color: #f1c40f;
`;

const Content = styled.p`
  margin-top: 0.5rem;
  width: 100%;
  font-size: 0.95rem;
  color: #dfdfdf;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 10px;
  border-radius: 10px;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ExistingImagesContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const EditInput = styled.textarea`
  width: 95%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #000;
  color: #ccc;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Star = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "filled",
})<{ filled: boolean }>`
  font-size: 1.5rem;
  color: ${(props) => (props.filled ? "#FFD700" : "#ccc")};
  cursor: pointer;
`;

const ImagesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  border-radius: 25px;
`;

const ReviewImage = styled.img`
  width: 130px;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 1024px) {
    width: 120px;
    height: 130px;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const NewImagesContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const DeleteImageButton = styled.button`
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

const AddImageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(
    255,
    255,
    255,
    0.1
  ); 
  color: #fff;
  border: 1px dashed #ddd;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1.5rem;
  width: 130px;
  height: 140px;
  transition: background-color 0.3s ease, color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: #fff;
  }

  @media (max-width: 1024px) {
    width: 120px;
    height: 130px;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }

  svg {
    font-size: 2.5rem;
    color: #fff; 
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const SaveButton = styled.button`
  background-color: #fff;
  color: #000;
  width: 60px;
  border: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    color: #ccc;
  }
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
`;

const ReviewDate = styled.div`
  font-size: 0.875rem;
  color: #888;
  padding-top: 10px;
`;

const Likes = styled.div`
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.875rem;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.875rem;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.875rem;
`;

const Actions = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: #888;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Nickname = styled.div`
  font-weight: bold;
  color: #dfdfdf;
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
`;

const FanTeamImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 33px;
  height: 30px;
`;
