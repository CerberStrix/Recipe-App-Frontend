import React from 'react';

import { Post } from '../components/Recipe';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export const FullRecipe = () => {
  const [obj, setObj] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/recipe/${id}`)
      .then((res) => {
        setObj(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении рецепта');
      });
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={obj._id}
        name={obj.name}
        ingridients={obj.ingridients}
        description={obj.description}
        coockingTime={obj.coockingTime}
        imageUrl={`${process.env.REACT_APP_API_URL}${obj.imageUrl}`}
        createdAt={obj.createdAt}
        isEditable
        isFullPost>
        <ReactMarkdown children={obj.description} />
      </Post>
    </>
  );
};
