import { BookReviewItemWrite } from '@/models/review.model';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
import { p } from 'msw/lib/core/GraphQLHandler-jOzqbxSK';

interface Props {
    onAdd: (data: BookReviewItemWrite) => void;
}

function BookReviewAdd({ onAdd }: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BookReviewItemWrite>();

    return (
        <BookReviewAddStyle>
            <form onSubmit={handleSubmit(onAdd)}>
                <fieldset>
                    <textarea {...register("comment", { required: true })}></textarea>
                    {errors.comment && <p className="error-text">리뷰 내용을 입력해주세요.</p>}
                </fieldset>
                <div className="submit">
                    <fieldset>
                        <select {...register("score", { required: true, valueAsNumber: true })}>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5" selected>⭐⭐⭐⭐⭐</option>
                        </select>
                    </fieldset>
                    <Button size="medium" scheme="primary">작성하기</Button>
                </div>
            </form>
        </BookReviewAddStyle>
    );
}

const BookReviewAddStyle = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 6px;

        fieldset {
            border: 0;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
            justify-content: end;

            .error-text {
                color: red;
                margin: 0;
            }
        }

        textarea {
            width: 100%;
            height: 100%;
            border: 1px solid ${({ theme }) => theme.color.border};
            border-radius: ${({ theme }) => theme.borderRadius.default};
            padding: 12px;
        }
    }

    .submit {
        display: flex;
        justify-content: end;
        gap: 12px;

        select {
            height: 100%;
        }
    }
`;

export default BookReviewAdd;