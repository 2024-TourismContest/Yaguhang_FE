import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleLikeOnServer } from "../../apis/review/index";
import styled from "styled-components";
import RightArrow from "../../assets/icons/arrow_right.svg";
import defaultImg from "../../assets/images/default-profile.svg";
import ImageModal from "../../components/common/ImageModal";
import {
  FaRegHeart,
  FaHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

// 태그와 본문을 분리하는 함수
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

interface ReviewItemProps {
  reviewId: number;
  spotId: number;
  spotName?: string;
  authorName?: string;
  profileImage?: string;
  createdAt: string;
  content: string;
  star: number;
  likeCount: number;
  isMine: boolean;
  isLiked: boolean;
  image?: string[];
  stadiumId: number;
  category: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  isMine = false,
  reviewId,
  spotId,
  spotName,
  authorName,
  profileImage,
  createdAt,
  content,
  star,
  likeCount,
  isLiked: initialIsLiked,
  stadiumId,
  image = [],
  category,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const { text, tags } = parseReviewContent(content);

  const toggleLike = async () => {
    const newLikeStatus = !isLiked;
    const updatedLikeCount = await toggleLikeOnServer(reviewId);

    if (updatedLikeCount !== null) {
      setIsLiked(newLikeStatus);
      setLikes(updatedLikeCount);
    }
  };

  const handleClick = () => {
    const url = `/details/${category}/${spotId}?stadiumId=${stadiumId}`;
    navigate(url);
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const nextImage = () => {
    if (currentImageIndex < image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const renderStars = (star: number) => {
    const validRating = Math.max(0, Math.min(star, 5));
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 !== 0;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

    return (
      <>
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <FaStar key={`full-${index}`} color="#FFD700" />
          ))}
        {hasHalfStar && <FaStarHalfAlt color="#FFD700" />}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} color="#FFD700" />
          ))}
      </>
    );
  };

  const formattedRating = (Math.round(star * 2) / 2).toFixed(1);

  return (
    <>
      <ReviewItemContainer>
        <LeftContent>
          {profileImage && (
            <ProfileImg src={profileImage || defaultImg} alt="프로필 이미지" />
          )}
          <ReviewInfo>
            {spotName && (
              <StadiumNameContainer onClick={handleClick}>
                <StadiumName>{spotName}</StadiumName>
                <ArrowIcon src={RightArrow} alt="Right Arrow" />
              </StadiumNameContainer>
            )}
            {authorName && <AuthorName>{authorName}</AuthorName>}
            {createdAt && (
              <DateText>{new Date(createdAt).toLocaleDateString()}</DateText>
            )}
          </ReviewInfo>
        </LeftContent>
        <Rating>
          {renderStars(star)} <span>({formattedRating})</span>
        </Rating>
        <ReviewText>{text}</ReviewText>
        {tags.length > 0 && (
          <TagContainer>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagContainer>
        )}
        {image.length > 0 && (
          <ImagesContainer>
            {image.slice(0, 4).map((img, index) => (
              <ReviewImage
                key={index}
                src={img}
                alt={`리뷰 이미지 ${index + 1}`}
                onClick={() => openModal(index)}
              />
            ))}
            {image.length > 4 && (
              <DarkenedImageContainer onClick={() => openModal(4)}>
                <DarkenedImage src={image[4]} alt="리뷰 이미지 5" />
                <ImageCount>+ {image.length - 4}</ImageCount>
              </DarkenedImageContainer>
            )}
          </ImagesContainer>
        )}
        <Div>
          <Likes onClick={toggleLike}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}{" "}
            {`${likes}명에게 도움이 된 후기`}
          </Likes>
          {!isMine && (
            <Actions>
              <TextBtn
                onClick={() => {
                  /* 수정 로직 */
                }}
              >
                수정
              </TextBtn>
              <TextBtn
                onClick={() => {
                  /* 삭제 로직 */
                }}
              >
                삭제
              </TextBtn>
            </Actions>
          )}
        </Div>
      </ReviewItemContainer>

      <ImageModal
        isOpen={isModalOpen}
        image={image[currentImageIndex]}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
};
export default ReviewItem;

const ReviewItemContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LeftContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.75rem;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  color: #fff;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const StadiumNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const StadiumName = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ArrowIcon = styled.img`
  width: 1rem;
  margin-left: 1.75rem;

  @media (max-width: 768px) {
    margin-left: 0.75rem;
  }
`;

const AuthorName = styled.p`
  font-weight: 500;
  color: #fff;
  font-size: 1.15rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DateText = styled.p`
  color: #aaa;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: white;
  margin: 0.75rem 0;
  gap: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ReviewText = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 1rem;
  margin: 1rem 0;
  line-height: 1.5;
  font-weight: 400;
  text-align: justify;
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const DarkenedImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const DarkenedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
`;

const ImageCount = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #fff;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
`;

const Likes = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #e74c3c;

  svg {
    margin-right: 0.25rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const TextBtn = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
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
