import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { Modal, ModalContent, ModalHeading, ModalForm,  ModalLabel, ModalInput, ModalSubmitBtn, ModalCloseBtn} from './BooksStyle';

const AddBook = ({ onBookAdded, onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();

    const newBook = {
      title: title ? title : null ,
      author: author ? author : null ,
      year: year ? parseInt(year) : null,
      rating: rating ? parseInt(rating) : null,
      isbn: isbn ? isbn : null,
    };

    try {
      const booksCollection = collection(db, 'books');
      await addDoc(booksCollection, newBook);
      onBookAdded();
      setTitle('');
      setAuthor('');
      setYear('');
      setRating('');
      setIsbn('');
      onClose();
    } catch (error) {
      console.error('Ошибка добавления книги: ', error);
    }
  };

  return (
    <Modal >
    <ModalContent >
      <ModalHeading>Добавить книгу</ModalHeading>
      <ModalForm onSubmit={handleAddBook}>

        <ModalLabel>
          Название:
          <ModalInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </ModalLabel>

        <ModalLabel>
          Автор:
          <ModalInput type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </ModalLabel>

        <ModalLabel>
          Год:
          <ModalInput type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </ModalLabel>

        <ModalLabel>
          Рейтинг:
          <ModalInput type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </ModalLabel>

        <ModalLabel>
          ISBN:
          <ModalInput type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </ModalLabel>

        <div className='flex-sb'>
          <ModalSubmitBtn type="submit">Добавить</ModalSubmitBtn>
          <ModalCloseBtn type="button" onClick={onClose}>Отменить</ModalCloseBtn>
        </div>

      </ModalForm>
    </ModalContent>
  </Modal>

  );
};

export default AddBook;