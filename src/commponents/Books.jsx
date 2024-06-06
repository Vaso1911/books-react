import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { Container, List, ListItem, ListItemContainer, ListItemHeading, ListItemLink, MainHeading, Span, Button, ButtonContainer, AddModalBtn, LinkSpan, YearHeading } from './BooksStyle';
import AddBook from './AddBook';
import EditBook from './EditBook';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [recommendedBook, setRecommendedBook] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchBooks = async () => {
    const booksCollection = collection(db, 'books');
    const booksSnapshot = await getDocs(booksCollection);
    const booksList = booksSnapshot.docs.map(doc => ({...doc.data() }));
    setBooks(booksList);
    setRecommendedBook(getRecommendedBook(booksList));
  };

  useEffect(() => {
    fetchBooks();
  },[]);

  const getRecommendedBook = (books) => {
    const threeYearsAgo = new Date().getFullYear() - 3;
    const oldBooks = books.filter(book => book.year && book.year <= threeYearsAgo);
    const bestBooks = oldBooks.filter(book => book.rating).sort((a, b) => b.rating - a.rating);

    if (bestBooks.length > 0) {
      const maxRating = bestBooks[0].rating;
      const highestRatedBooks = bestBooks.filter(book => book.rating === maxRating);
      return highestRatedBooks[Math.floor(Math.random() * highestRatedBooks.length)];
    }

    return null;
  };

  const groupedBooks = books.reduce((acc, book) => {
    const year = book.year || 'Без указания года';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(book);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedBooks)
    .sort((a, b) => {
      if (a === 'Без указания года') return 1;
      if (b === 'Без указания года') return -1;
      return b - a;
    });

  sortedYears.forEach(year => {
    groupedBooks[year].sort((a, b) => a.title.localeCompare(b.title));
  });

  const handleBookClick = (isbn, e) => {
    e.preventDefault();
    if (isbn) {
      window.open(`https://books.google.com/books?vid=ISBN${isbn}`, '_blank');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, 'books', id));
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book: ', error);
    }
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setShowEditModal(true);
  };

  const handleAddBook = () => {
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setBookToEdit(null);
    setShowAddModal(false);
  };


  return (
    <Container>
      <MainHeading>Книги</MainHeading>
      {recommendedBook && (
        <div className='flex-sb'>
          <YearHeading>Рекомендуемая книга</YearHeading>
          <AddModalBtn onClick={handleAddBook}>Добавить</AddModalBtn>
        </div>
      )}
      {sortedYears.map(year => (
        <div key={year}>
          <h2>{year}</h2>
          <List>
            {groupedBooks[year].map((book, index) => (
              <ListItem key={index}>
                <ListItemContainer>
                  {book.title && <ListItemHeading>{book.title}</ListItemHeading>}
                  {book.author && <Span>Автор:{book.author}</Span>}
                  {book.year && <Span>Год публикации:{book.year}</Span>}
                  {book.rating && <Span>Рейтинг:{book.rating}</Span>}
                  {book.isbn &&
                    <ListItemLink href="/" onClick={(e) => handleBookClick(book.isbn, e)}>
                      ISBN:<LinkSpan>{book.isbn}</LinkSpan>
                    </ListItemLink>}
                  <ButtonContainer>
                    <Button title='Редактировать' onClick={() => handleEditBook(book)}>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.943 7.59485L18.4041 3.05602C18.2721 2.92397 18.1154 2.81922 17.9428 2.74776C17.7703 2.67629 17.5854 2.63951 17.3987 2.63951C17.2119 2.63951 17.027 2.67629 16.8545 2.74776C16.682 2.81922 16.5252 2.92397 16.3932 3.05602L3.86953 15.5807C3.73723 15.7125 3.63233 15.8693 3.56086 16.0418C3.4894 16.2144 3.45278 16.3994 3.45313 16.5862V21.125C3.45313 21.5021 3.60293 21.8638 3.86959 22.1304C4.13624 22.3971 4.4979 22.5469 4.875 22.5469H9.41383C9.60061 22.5472 9.78561 22.5106 9.95817 22.4391C10.1307 22.3677 10.2875 22.2628 10.4193 22.1305L22.943 9.60579C23.075 9.47375 23.1798 9.317 23.2512 9.14448C23.3227 8.97196 23.3595 8.78705 23.3595 8.60032C23.3595 8.41358 23.3227 8.22867 23.2512 8.05616C23.1798 7.88364 23.075 7.72688 22.943 7.59485ZM4.92477 16.25L13.8125 7.36125L15.794 9.34375L6.90625 18.2315L4.92477 16.25ZM4.67188 21.125V17.7206L8.27836 21.3281H4.875C4.82113 21.3281 4.76946 21.3067 4.73137 21.2686C4.69328 21.2305 4.67188 21.1789 4.67188 21.125ZM9.75 21.0752L7.76852 19.0938L16.6563 10.205L18.6377 12.1875L9.75 21.0752ZM22.0807 8.74453L19.5 11.3252L14.6748 6.5L17.2555 3.91829C17.2743 3.8994 17.2967 3.88442 17.3214 3.8742C17.3461 3.86397 17.3725 3.85871 17.3992 3.85871C17.4259 3.85871 17.4523 3.86397 17.477 3.8742C17.5016 3.88442 17.524 3.8994 17.5429 3.91829L22.0807 8.45711C22.0996 8.47598 22.1146 8.49838 22.1248 8.52304C22.135 8.5477 22.1403 8.57413 22.1403 8.60082C22.1403 8.62752 22.135 8.65395 22.1248 8.67861C22.1146 8.70327 22.0996 8.72567 22.0807 8.74453Z" fill="currentColor" />
                      </svg>
                    </Button>
                    <Button onClick={() => handleDeleteBook(book.id)}>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.9375 4.875H17.875V4.0625C17.875 3.41603 17.6182 2.79605 17.1611 2.33893C16.704 1.88181 16.084 1.625 15.4375 1.625H10.5625C9.91603 1.625 9.29605 1.88181 8.83893 2.33893C8.38181 2.79605 8.125 3.41603 8.125 4.0625V4.875H4.0625C3.84701 4.875 3.64035 4.9606 3.48798 5.11298C3.3356 5.26535 3.25 5.47201 3.25 5.6875C3.25 5.90299 3.3356 6.10965 3.48798 6.26202C3.64035 6.4144 3.84701 6.5 4.0625 6.5H4.875V21.125C4.875 21.556 5.0462 21.9693 5.35095 22.274C5.6557 22.5788 6.06902 22.75 6.5 22.75H19.5C19.931 22.75 20.3443 22.5788 20.649 22.274C20.9538 21.9693 21.125 21.556 21.125 21.125V6.5H21.9375C22.153 6.5 22.3597 6.4144 22.512 6.26202C22.6644 6.10965 22.75 5.90299 22.75 5.6875C22.75 5.47201 22.6644 5.26535 22.512 5.11298C22.3597 4.9606 22.153 4.875 21.9375 4.875ZM9.75 4.0625C9.75 3.84701 9.8356 3.64035 9.98798 3.48798C10.1403 3.3356 10.347 3.25 10.5625 3.25H15.4375C15.653 3.25 15.8597 3.3356 16.012 3.48798C16.1644 3.64035 16.25 3.84701 16.25 4.0625V4.875H9.75V4.0625ZM19.5 21.125H6.5V6.5H19.5V21.125ZM11.375 10.5625V17.0625C11.375 17.278 11.2894 17.4847 11.137 17.637C10.9847 17.7894 10.778 17.875 10.5625 17.875C10.347 17.875 10.1403 17.7894 9.98798 17.637C9.8356 17.4847 9.75 17.278 9.75 17.0625V10.5625C9.75 10.347 9.8356 10.1403 9.98798 9.98798C10.1403 9.8356 10.347 9.75 10.5625 9.75C10.778 9.75 10.9847 9.8356 11.137 9.98798C11.2894 10.1403 11.375 10.347 11.375 10.5625ZM16.25 10.5625V17.0625C16.25 17.278 16.1644 17.4847 16.012 17.637C15.8597 17.7894 15.653 17.875 15.4375 17.875C15.222 17.875 15.0153 17.7894 14.863 17.637C14.7106 17.4847 14.625 17.278 14.625 17.0625V10.5625C14.625 10.347 14.7106 10.1403 14.863 9.98798C15.0153 9.8356 15.222 9.75 15.4375 9.75C15.653 9.75 15.8597 9.8356 16.012 9.98798C16.1644 10.1403 16.25 10.347 16.25 10.5625Z" fill="currentColor" />
                      </svg>
                    </Button>
                  </ButtonContainer>

                </ListItemContainer>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
      {showEditModal && (
        <EditBook book={bookToEdit} onClose={handleModalClose} onBookUpdated={fetchBooks} />
      )}
      {showAddModal && (
        <AddBook onClose={handleModalClose} onBookUpdated={fetchBooks} />
      )}
    </Container>
  );
};

export default Books;
