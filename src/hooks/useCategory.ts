import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../constants/querystrings";

export const useCategory = () => {
    const location = useLocation();
    const [category, setCategory] = useState<Category[]>([]);

    const setActive = () => {
        const params = new URLSearchParams(location.search);
        setCategory((prev) => {
            return prev.map(item => {
                return {
                    ...item,
                    isActive: params.get(QUERYSTRING.CATEGORY_ID)
                        ? item.id === Number(params.get(QUERYSTRING.CATEGORY_ID))
                        : item.id === null
                }
            })
        });
    };

    useEffect(() => {
        fetchCategory()
            .then(category => {
                if (!category) return;

                const categoryWithAll = [
                    {
                        id: null,
                        name: "전체"
                    },
                    ...category
                ];

                setCategory(categoryWithAll);
                setActive();
            });
    }, []);

    useEffect(() => {
        setActive();
    }, [location.search]);

    return { category };
};