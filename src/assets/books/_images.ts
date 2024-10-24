import explorersBook from './explorersBook.jpg';
import freeTimeBook from './freeTimeBook.jpg';
import nightRead from './nightRead.jpg';
import notebook from './notebook.jpg';
import orangeDiary from './orangeDiary.jpg';

export type BookImageKeys = 'freeTimeBook.jpg' | 'orangeDiary.jpg' | 'nightRead.jpg' | 'notebook.jpg' | 'explorersBook.jpg';
export const bookImages: Record<BookImageKeys, string> = {
    "freeTimeBook.jpg": explorersBook,
    "orangeDiary.jpg": freeTimeBook,
    "nightRead.jpg": nightRead,
    "notebook.jpg": notebook,
    "explorersBook.jpg": orangeDiary,
};