import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';

export const AddRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState('');
  const [imageUrl, setimageUrl] = React.useState('');
  const [ingridients, setIngridients] = React.useState('');
  const [coockingTime, setСoockingTime] = React.useState('');
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setimageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке файла');
    }
    console.log(event.target.files);
  };

  const onClickRemoveImage = () => {
    setimageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setDescription(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const ingridientsMass = ingridients.split(',');
      const fields = {
        name,
        description,
        imageUrl,
        ingridients: ingridientsMass,
        coockingTime,
      };

      const { data } = isEditing
        ? await axios.patch(`/recipe/${id}`, fields)
        : await axios.post('/recipe', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/recipe/${_id}`);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании статьи');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/recipe/${id}`).then(({ data }) => {
        setName(data.name);
        setDescription(data.description);
        setimageUrl(data.imageUrl);
        setIngridients(data.ingridients.join(','));
        setСoockingTime(data.coockingTime);
      });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Опишите ваш рецепт как можно детальнее :)',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  console.log({ name, ingridients, description });

  return (
    <Paper style={{ padding: 30 }}>
      {imageUrl.length < 3 && (
        <>
          <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
            Загрузить превью
          </Button>
          <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        </>
      )}
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`${process.env.REACT_API_URL}${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Как назовем рецепт?"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Введите ингридиенты через запятую.."
        value={ingridients}
        onChange={(e) => setIngridients(e.target.value)}
        fullWidth
      />

      <TextField
        classes={{ root: styles.coockingTime }}
        variant="standard"
        placeholder="Введите время приготовления.."
        value={coockingTime}
        onChange={(e) => setСoockingTime(e.target.value)}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={description}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
