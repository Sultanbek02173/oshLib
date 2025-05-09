import React, { useEffect } from "react";
import { NewsDeteilSection } from "../../widgets";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNews } from "../../app/store/reducers/news/newsSlice";
import { getNewsDetail } from "../../app/store/reducers/news/newsThunks";

export const NewsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item } = useNews();
  useEffect(() => {
    dispatch(getNewsDetail(id));
  }, []);
  return (
    <div>
      <NewsDeteilSection item={item} />
    </div>
  );
};
