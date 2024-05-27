import { GenreBookObject } from '../../globalTypes';
import { moreInfo } from '../../variables';
import BookItemComponent from '../book-item/bookItem.component';

import { 
    GenreOutlineWrapper,
    BooksWraper,
    Genre,
    BookCounter
} from './genreRow.styles';

const GenreRowComponent = ({ genre, books, cartItemInfo, setCartItemInfo }: GenreBookObject): JSX.Element => {
    const firstXBooks = books.filter((_, idx) => idx < 4);

    return (
        <GenreOutlineWrapper>
            <Genre>{genre}</Genre>
            <BookCounter>({books.length} books found)</BookCounter>
            <BooksWraper>
                {firstXBooks.map(book => (
                    <BookItemComponent 
                        key={book.id} book={book} 
                        buttonName={moreInfo} 
                        cartItemInfo={cartItemInfo} 
                        setCartItemInfo={setCartItemInfo}
                    />
                ))}
                
            </BooksWraper>
        </GenreOutlineWrapper>
    );
}

export default GenreRowComponent;