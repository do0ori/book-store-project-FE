import { Banner as IBanner } from '@/models/banner.model';
import styled from 'styled-components';
import BannerItem from './BannerItem';
import { useEffect, useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
    banners: IBanner[];
}

function Banner({ banners }: Props) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [bannerList, setBannerList] = useState<IBanner[]>([]);
    const [transition, setTransition] = useState(true);

    const transFormValue = useMemo(() => {
        return currentIndex * (-100);
    }, [currentIndex]);

    useEffect(() => {
        if (banners.length !== 0) {
            setBannerList([banners[banners.length - 1], ...banners, banners[0]]);
        }
    }, [banners]);

    const handlePrev = () => {
        const newCurrentIndex = currentIndex - 1;
        setCurrentIndex(newCurrentIndex);
        setTransition(true);

        if (newCurrentIndex === 0) {
            jump(banners.length);
        }
    };

    const handleNext = () => {
        const newCurrentIndex = currentIndex + 1;
        setCurrentIndex(newCurrentIndex);
        setTransition(true);

        if (newCurrentIndex === bannerList.length - 1) {
            jump(1);
        }
    };

    const handleIndicatorClick = (index: number) => {
        setCurrentIndex(index);
        setTransition(true);
    };

    const jump = (i: number) => {
        setTimeout(() => {
            setTransition(false);
            setCurrentIndex(i);
        }, 500);
    };

    return (
        <BannerStyle>
            <BannerContainerStyle $transFormValue={transFormValue} $transition={transition}>
                {
                    bannerList.map((banner, i) => (
                        <BannerItem key={i} banner={banner} />
                    ))
                }
            </BannerContainerStyle>

            <BannerButtonStyle>
                <button className="prev" onClick={handlePrev}>
                    <FaAngleLeft />
                </button>
                <button className="next" onClick={handleNext}>
                    <FaAngleRight />
                </button>
            </BannerButtonStyle>

            <BannerIndicatorStyle>
                {
                    banners.map((_, i) => (
                        <span
                            className={i + 1 === currentIndex ? "active" : ""}
                            onClick={() => handleIndicatorClick(i + 1)}>
                        </span>
                    ))
                }
            </BannerIndicatorStyle>
        </BannerStyle>
    );
}

const BannerStyle = styled.div`
    overflow: hidden;
    position: relative;
`;

interface BannerContainerStyleProps {
    $transFormValue: number;
    $transition: boolean;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
    display: flex;
    transform: translateX(${({ $transFormValue }) => $transFormValue}%);
    transition: ${({ $transition }) => $transition ? "transform 0.5s ease-in-out" : "none"};
`;

const BannerButtonStyle = styled.div`
    button {
        border: 0;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 500px;
        font-size: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        
        svg {
            fill: #fff;
        }

        &.prev {
            left: 10px;
        }

        &.next {
            right: 10px;
        }
    }
`;

const BannerIndicatorStyle = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    span {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 100px;
        background: #fff;
        margin: 0 4px;

        cursor: pointer;

        &.active {
           background-color : ${({ theme }) => theme.color.primary};
        }
    }
`;

export default Banner;