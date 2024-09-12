// import { useState } from "react";
// import styled from "styled-components";
// import { IoImageOutline } from "react-icons/io5";
// import { FaRegHeart } from "react-icons/fa";

// interface ReviewProps {
//   contentId: number;
//   id?: string;
// }

// interface ReviewData {
//   reviewId: number;
//   authorName: string;
//   profileImage: string;
//   createdAt: string;
//   content: string;
//   images: string[];
//   rating: number;
//   likes: number;
//   isMine: boolean;
//   isLiked: boolean;
// }

// const dummyReviews: ReviewData[] = [
//   {
//     reviewId: 1,
//     authorName: "양두영",
//     profileImage: "profile1.jpg",
//     createdAt: "2024-07-03T12:34:56Z",
//     content: "진짜 너무 좋은 곳이에요. 별 보고 이건 이렇게 멋질수가 없다.",
//     images: [],
//     rating: 5.0,
//     likes: 5,
//     isMine: false,
//     isLiked: false,
//   },
//   {
//     reviewId: 2,
//     authorName: "영두양",
//     profileImage: "profile2.jpg",
//     createdAt: "2024-07-03T12:34:56Z",
//     content: "와 정말 좋은 시간을 보냈습니다. 꼭 다시 올거에요.",
//     images: [],
//     rating: 4.5,
//     likes: 5,
//     isMine: false,
//     isLiked: false,
//   },
// ];

// const Review: React.FC<ReviewProps> = ({ id }) => {
//   const [reviews, setReviews] = useState<ReviewData[]>(dummyReviews);
//   const [newReview, setNewReview] = useState("");
//   const [rating, setRating] = useState(0);

//   const handleReviewSubmit = () => {
//     const newReviewData: ReviewData = {
//       reviewId: reviews.length + 1,
//       authorName: "내 이름",
//       profileImage: "my_profile_image.jpg",
//       createdAt: new Date().toISOString(),
//       content: newReview,
//       images: [],
//       rating,
//       likes: 0,
//       isMine: true,
//       isLiked: false,
//     };
//     setReviews([newReviewData, ...reviews]);
//     setNewReview("");
//     setRating(0);
//   };

//   return (
//     <div id={id}>
//       <ReviewContainer>
//         <Header>
//           <Title>야구행 리뷰</Title>
//           <SortOptions>
//             <span>최신순</span> | <span>인기순</span>
//           </SortOptions>
//         </Header>
//         <ReviewInputContainer>
//           <RatingContainer>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 filled={star <= rating}
//                 onClick={() => setRating(star)}
//               >
//                 ★
//               </Star>
//             ))}
//           </RatingContainer>
//           <ReviewInput
//             placeholder="여기를 클릭해서 리뷰를 입력하세요. (최대 300자)"
//             value={newReview}
//             onChange={(e) => setNewReview(e.target.value)}
//           />
//           <SubmitContainer>
//             <CameraIcon>
//               <IoImageOutline />
//             </CameraIcon>
//             <SubmitButton onClick={handleReviewSubmit}>등록</SubmitButton>
//           </SubmitContainer>
//         </ReviewInputContainer>
//         <ReviewList>
//           {reviews.map((review) => (
//             <ReviewItem key={review.reviewId}>
//               <LeftContent>
//                 <ProfileIcon>•</ProfileIcon>
//                 <ReviewText>
//                   <ReviewTitle>
//                     {review.authorName} <RightArrow></RightArrow>
//                   </ReviewTitle>
//                   <ReviewRating>⭐ {review.rating} (5.0)</ReviewRating>
//                   <ReviewContent>{review.content}</ReviewContent>
//                   <LikesContainer>
//                     <FaRegHeart />
//                     {review.likes}
//                   </LikesContainer>
//                 </ReviewText>
//               </LeftContent>
//               <ImageContainer></ImageContainer>
//             </ReviewItem>
//           ))}
//         </ReviewList>
//       </ReviewContainer>
//     </div>
//   );
// };

// export default Review;

// const ReviewContainer = styled.div`
//   margin-top: 1.5rem;
//   padding: 0.5rem;
//   color: white;
//   border-radius: 8px;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const Title = styled.h2`
//   margin: 0;
//   font-size: 1.25rem;
// `;

// const SortOptions = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   font-size: 0.75rem;

//   span {
//     cursor: pointer;
//     color: #ccc;
//     &:hover {
//       color: white;
//     }
//   }
// `;

// const ReviewInputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: #000;
//   padding: 0.75rem;
//   border-radius: 8px;
//   margin-bottom: 1.5rem;
//   border: 1px solid #fff;
// `;

// const RatingContainer = styled.div`
//   display: flex;
//   margin-bottom: 0.75rem;
// `;

// const Star = styled.span<{ filled: boolean }>`
//   font-size: 1.25rem;
//   color: ${(props) => (props.filled ? "#FFD700" : "#555")};
//   cursor: pointer;
// `;

// const ReviewInput = styled.textarea`
//   width: 100%;
//   border: none;
//   background-color: #000;
//   color: white;
//   font-size: 0.875rem;
//   outline: none;
// `;

// const SubmitContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
// `;

// const CameraIcon = styled.div`
//   font-size: 1.25rem;
//   cursor: pointer;
//   margin-right: 0.75rem;
//   font-size: 2rem;
// `;

// const SubmitButton = styled.button`
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 12px;
//   background-color: #fff;
//   color: black;
//   font-weight: bold;
//   cursor: pointer;
//   font-size: 0.875rem;
// `;

// const ReviewList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const ReviewItem = styled.div`
//   padding: 1rem;
//   background-color: #2c2c2c;
//   border-radius: 12px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const LeftContent = styled.div`
//   display: flex;
//   align-items: flex-start;
// `;

// const ProfileIcon = styled.div`
//   font-size: 1.5rem;
//   color: #fff;
//   margin-right: 0.75rem;
// `;

// const ReviewText = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ReviewTitle = styled.h3`
//   margin: 0;
//   font-size: 1rem;
//   display: flex;
//   align-items: center;
// `;

// const RightArrow = styled.span`
//   margin-left: 0.5rem;
//   font-size: 1.25rem;
// `;

// const ReviewRating = styled.div`
//   margin: 0.5rem 0;
//   font-size: 0.875rem;
// `;

// const ReviewContent = styled.p`
//   margin: 0;
//   font-size: 0.75rem;
//   color: #ccc;
// `;

// const LikesContainer = styled.div`
//   border-radius: 12px;
//   padding: 0.5rem;
//   color: white;
//   width: 35px;
//   margin-top: 10px;
//   border: 1px solid #fff;
//   text-align: center;
//   font-size: 1.2rem;
// `;

// const ImageContainer = styled.div`
//   border-radius: 12px;
//   padding: 0.5rem;
//   color: white;
//   width: 100px;
//   height: 90px;
//   margin-top: 10px;
//   border: 1px solid #fff;
//   text-align: center;
//   space-between: around;
//   font-size: 0.875rem;
// `;
