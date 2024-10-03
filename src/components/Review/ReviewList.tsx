import { MouseEvent, useEffect, useRef, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
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
import ImageModal from "../../components/common/ImageModal";
import { tagData } from "./tagData";
import { useLocation } from "react-router-dom";
import ReviewTag from "./ReviewTag";

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
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [editedStar, setEditedStar] = useState<number>(0);
  const [editedImages, setEditedImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentReviewImages, setCurrentReviewImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const location = useLocation(); // URL에서 카테고리 추출

  // URL에서 카테고리를 추출하고 해당 카테고리의 태그를 가져옴
  const urlCategory = decodeURIComponent(
    location.pathname.split("/")[2]
  ) as keyof typeof tagData;
  const availableTags = tagData[urlCategory] || []; // 해당 카테고리의 태그 목록을 가져옴

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

  const parseReviewContent = (content: string) => {
    const tagIndex = content.indexOf("[태그]:");

    if (tagIndex === -1) {
      return { text: content, tags: [] };
    }

    const text = content.slice(0, tagIndex).trim();
    const tags = content
      .slice(tagIndex + "[태그]:".length)
      .trim()
      .split(", ");

    return { text, tags };
  };

  // const handleTagClick = (tag: string) => {
  //   if (selectedTags.includes(tag)) {
  //     setSelectedTags(selectedTags.filter((t) => t !== tag));
  //   } else {
  //     setSelectedTags([...selectedTags, tag]);
  //   }
  // };

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

  const handleEditClick = (review: ReviewData) => {
    // parseReviewContent 함수를 사용하여 본문과 태그를 분리
    const parsedContent = parseReviewContent(review.content);

    setEditingReviewId(review.reviewId);
    setEditedContent(parsedContent.text);
    setEditedStar(review.star);
    setEditedImages(review.images);
    setSelectedTags(parsedContent.tags);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setIsEditing(false);
  };

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

      const updatedImages = [...editedImages, ...uploadedImageUrls];
      // 기존 content에서 태그 부분을 제거한 후 다시 태그를 붙임
      const tagIndex = editedContent.indexOf("[태그]:");
      const contentWithoutTags =
        tagIndex !== -1
          ? editedContent.slice(0, tagIndex).trim()
          : editedContent;
      // 태그를 content에 포함
      const tag =
        selectedTags.length > 0 ? `\n\n[태그]: ${selectedTags.join(", ")}` : "";
      const updatedContent = contentWithoutTags + tag; // 기존 태그를 제거한 후 새 태그를 다시 추가
      await updateReview(reviewId, {
        content: updatedContent,
        star: editedStar,
        images: updatedImages,
      });

      setEditingReviewId(null);
      setIsEditing(false);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.reviewId === reviewId
            ? {
                ...review,
                content: updatedContent,
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

  const openModal = (review: ReviewData, index: number) => {
    setCurrentReviewImages(review.images); // 클릭한 리뷰의 이미지 배열 설정
    setCurrentImageIndex(index); // 클릭한 이미지 인덱스 설정
    setIsModalOpen(true);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentReviewImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === currentReviewImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const closeModal = () => setIsModalOpen(false);

  const handleStarClick = (e: MouseEvent, index: number) => {
    const starElement = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - starElement.left;

    const newRating =
      clickPosition < starElement.width / 2 ? index + 0.5 : index + 1;
    setEditedStar(newRating);
  };

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
        reviews.map((review) => {
          const { text, tags } = parseReviewContent(review.content);

          return (
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
                  {/* 수정 모드 처리 */}
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
                  {/* 수정 중일 때 태그를 선택할 수 있도록 처리 */}
                  <TagEditorContainer>
                    <ReviewTag
                      tags={availableTags}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                    />
                  </TagEditorContainer>

                  <ImagesWrapper>
                    <ExistingImagesContainer>
                      {editedImages.map((image, index) => (
                        <ImageWrapper key={index}>
                          <ReviewImage
                            src={image}
                            alt={`Review Image ${index + 1}`}
                            onClick={() => openModal(review, index)}
                          />
                          <DeleteImageButton
                            onClick={() => handleImageDelete(index, false)}
                          >
                            삭제
                          </DeleteImageButton>
                        </ImageWrapper>
                      ))}
                    </ExistingImagesContainer>

                    {/* 새 이미지 추가 */}
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
                        <IoImageOutline /> {/* 이미지 추가 버튼 */}
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
                  <Content>{text}</Content>

                  {tags.length > 0 && (
                    <TagContainer>
                      {tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </TagContainer>
                  )}

                  {review.images.length > 0 && (
                    <ImagesContainer>
                      {review.images.slice(0, 4).map((image, index) => (
                        <ReviewImage
                          key={index}
                          src={image}
                          alt={`Review Image ${index + 1}`}
                          onClick={() => openModal(review, index)}
                        />
                      ))}
                      {review.images.length > 4 && (
                        <DarkenedImageContainer
                          onClick={() => openModal(review, 4)}
                        >
                          <DarkenedImage
                            src={review.images[4]}
                            alt={`Review Image 5`}
                          />
                          <ImageCount>+ {review.images.length - 4}</ImageCount>
                        </DarkenedImageContainer>
                      )}
                    </ImagesContainer>
                  )}
                </>
              )}

              {!isEditing && (
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
                      <DeleteButton
                        onClick={() => handleDelete(review.reviewId)}
                      >
                        삭제
                      </DeleteButton>
                    </Actions>
                  )}
                </ReviewFooter>
              )}
            </ReviewItem>
          );
        })
      )}

      {/* 이미지 모달 컴포넌트 */}
      <ImageModal
        isOpen={isModalOpen}
        image={currentReviewImages[currentImageIndex]} // 현재 이미지
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </ListContainer>
  );
};

export default ReviewList;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const TagEditorContainer = styled.div`
  margin-top: 1rem;
`;

const Tag = styled.span`
  background-color: #444444;
  color: #ccc;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  display: inline-block;
  transition: all 0.3s ease;

  &:hover {
    background-color: #555555;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
`;

const DarkenedImageContainer = styled.div`
  position: relative;
  width: 130px;
  height: 140px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1024px) {
    width: 120px;
    height: 130px;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const DarkenedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  opacity: 0.6;

  @media (max-width: 1024px) {
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    border-radius: 6px;
  }
`;

const ImageCount = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 1;
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 70vw;
  margin: 0 auto;
  margin-bottom: 20vh;

  @media (max-width: 768px) {
    max-width: 95vw;
    gap: 1rem;
  }
`;

const ReviewItem = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-bottom: 0.5px dashed #ccc;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Rating = styled.div`
  font-size: 1rem;
  color: #f1c40f;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
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
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px;
  }
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
  background-color: rgba(255, 255, 255, 0.1);
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
  }
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

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;
const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
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

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const FanTeamImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 33px;
  height: 30px;

  @media (max-width: 768px) {
    width: 28px;
    height: 25px;
  }
`;
