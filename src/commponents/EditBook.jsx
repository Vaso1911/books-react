import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { Modal, ModalContent, ModalHeading, ModalForm,  ModalLabel, ModalInput, ModalSubmitBtn, ModalCloseBtn} from './BooksStyle';

const EditBook = ({ book, onClose, onBookUpdated }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [year, setYear] = useState(book.year || '');
  const [rating, setRating] = useState(book.rating || '');
  const [isbn, setIsbn] = useState(book.isbn || '');

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const bookRef = doc(db, 'books', book.id);
    try {
      await updateDoc(bookRef, {
        title: title ? title : null ,
        author: author ? author : null ,
        year: year ? parseInt(year) : null,
        rating: rating ? parseInt(rating) : null,
        isbn: isbn ? isbn : null,
      });
      onBookUpdated();
      onClose();
    } catch (error) {
      console.error('Ошибка редактирование книги: ', error);
    }
  };

  return (
    <Modal >
      <ModalContent >
        <ModalHeading>Редактировать книгу</ModalHeading>
        <ModalForm onSubmit={handleUpdateBook}>

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
            <ModalSubmitBtn type="submit">Редактировать</ModalSubmitBtn>
            <ModalCloseBtn type="button" onClick={onClose}>Отменить</ModalCloseBtn>
          </div>

        </ModalForm>
      </ModalContent>
    </Modal>
  );
};

export default EditBook;
