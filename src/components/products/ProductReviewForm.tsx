import { ChangeEvent, SyntheticEvent, useState } from "react";
import styles from "./ProductReviewForm.module.css";
import { ProductReviewData } from "./ProductReviewData";
import { useRouter } from "next/router";

interface Props {
    productId: string,
    onBackButton: () => void
}


function ProductReviewForm(props: Props) {
    const router = useRouter();

    const [reviewHeading,setReviewHeading] = useState('');
    const [reviewDetail,setReviewDetail] = useState('');
    const [reviewerName,setReviewerName] = useState('');
    const [rating,setRating] = useState(0);
    
    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setReviewerName(e.target.value);
    }

    const handleReviewHeading = (e: ChangeEvent<HTMLInputElement>) => {
        setReviewHeading(e.target.value);
    }

    const handleReviewDetail = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewDetail(e.target.value);
    }

    const addProductReview = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const reviewData : ProductReviewData = {
            reviewerName: reviewerName,
            rating: rating,
            reviewHeading: reviewHeading,
            reviewDetail: reviewDetail,
            productId: props.productId,
            reviewLikes: 0,
            reviewDislikes: 0
        }

        const submitReview = async() => {
            const response = await fetch('/api/submitProductReview',
                {
                    method: "POST",
                    body: JSON.stringify(reviewData)
                }
            );
            const data = await response.json();
            const { status } = data; 

            if (status) {
                alert("Review Submitted Successfuly");
                router.reload();
            }
        }

        submitReview();
    }

    return (<form className={styles.reviewForm} onSubmit={addProductReview}>
        <label className={styles.reviewLabel}>Your Name
            <input required={true} className={styles.inputField} type='text' placeholder='Enter Name Here' onChange={handleNameInput}/>
        </label>
        <label className={styles.reviewLabel}>How would you rate the product?
            <div>
                {rating >= 1 ? <img className={styles.starImage} onClick={() => setRating(1)} src="/images/product/FillStar.svg"/> : <img className={styles.starImage} onClick={() => {setRating(1)}} src="/images/product/EmptyStar.svg"/>}
                {rating >= 2 ? <img className={styles.starImage} onClick={() => setRating(2)} src="/images/product/FillStar.svg"/> : <img className={styles.starImage} onClick={() => setRating(2)} src="/images/product/EmptyStar.svg"/>}
                {rating >= 3 ? <img className={styles.starImage} onClick={() => setRating(3)} src="/images/product/FillStar.svg"/> : <img className={styles.starImage} onClick={() => setRating(3)} src="/images/product/EmptyStar.svg"/>}
                {rating >= 4 ? <img className={styles.starImage} onClick={() => setRating(4)} src="/images/product/FillStar.svg"/> : <img className={styles.starImage} onClick={() => setRating(4)} src="/images/product/EmptyStar.svg"/>}
                {rating === 5 ? <img className={styles.starImage} onClick={() => setRating(5)} src="/images/product/FillStar.svg"/> : <img className={styles.starImage} onClick={() => setRating(5)} src="/images/product/EmptyStar.svg"/>}
            </div>
        </label>
        <label className={styles.reviewLabel}>Review Highlight
            <input required={true} className={styles.inputField} type='text' onChange={handleReviewHeading}/>
        </label>
        <label className={styles.reviewLabel}>Review Detail
            <textarea required={true} className={styles.textArea} onChange={handleReviewDetail} placeholder='Review Detail'>
            </textarea>
        </label>
        <button className={styles.button} type='submit'>Submit Review</button>
        <button className={styles.button} onClick={props.onBackButton} type='button'>Cancel</button>
    </form>);
}

export default ProductReviewForm;