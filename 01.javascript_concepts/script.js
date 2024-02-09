const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

//Destrucuturing

const book = getBook(3);

/*const title = book.title;
title; // 'Dune' */

//object destruture
const { title, author, genres } = book;

console.log(author, title, genres); //'Frank Herbert Dune [ \'science fiction\', \'novel\', \'adventure\' ]' '
/* //Array destuture
const [firstGenres,secondGenres] = genres;
console.log(firstGenres,secondGenres) // 'science fiction novel'
//rest operater */
const [firstGenres, secondGenres, ...others] = genres;
console.log(firstGenres, secondGenres, others); //'science fiction novel [ \'adventure\' ]'

//spread operator

/* const newGenres = [genres,'epic fantacy']
newGenres;// [ [ 'science fiction', 'novel', 'adventure' ], 'epic fantacy' ]
 */

const newGenres = [...genres, "epic fantacy"];

newGenres; // [ 'science fiction', 'novel', 'adventure', 'epic fantacy' ]

//Object spread operator;

/* const updatedBook = {book,moviePublicationDate:'22-10-2023'}
updatedBook; //{ book: { id: 3,title: 'Dune',publicationDate: '1965-01-01',author: 'Frank Herbert',genres: [ 'science fiction', 'novel', 'adventure' ],hasMovieAdaptation: true,pages: 658,translations: { spanish: '' },reviews: { goodreads: [Object] } },moviePublicationDate: '22-10-2023' } */

const updatedBook = {
  ...book, //adding new properties
  moviePublicationDate: "22-10-2023", // updtate exist properties
  pages: 1210,
};
updatedBook; //{ id: 3,title: 'Dune',publicationDate: '1965-01-01',author: 'Frank Herbert',genres: [ 'science fiction', 'novel', 'adventure' ],hasMovieAdaptation: true, pages: 1210,translations: { spanish: '' },reviews: { goodreads: { rating: 4.25, ratingsCount: 1142893, reviewsCount: 49701 } },moviePublicationDate: '22-10-2023' }

//template literals
//using backtic key ``
const summary = `${title} is a book`;
summary; //'Dune is a book'

//Ternaries instead of if/else statements
const checktitle = title === "Dune" ? "Dune is correct" : "Dune is not correct";
checktitle; //'Dune is correct'

//Arrow function

/* function name (x) {
 return x+1;
} */

const name = (x) => x + 1;

//Short Circuiting and Logical operator : && , || , ??

console.log(true && "some sring"); // 'some sring'
console.log(false && "some sring"); // false

console.log(true || "some sring"); // true
console.log(false || "some sring"); // 'something

console.log(false ?? "some sring"); // 0 only write 0 / 1

//Optional Chaining Operator

/*  it avoid errors on when access object property values is undefined outputs show NaN and also use nested objects access property values easily */
const books = getBooks();
//Array Methods;

//Map methods is loop each elements in array /objects create the new array.

const x = [1, 2, 3, 4, 5].map((x) => x * 2);
x; //[ 2, 4, 6, 8, 10 ]

const essentialBook = books.map((book) => {
  return {
    title: book.title,
    author: book.author,
  };
});
essentialBook; /* [ { title: 'The Lord of the Rings', author: 'J. R. R. Tolkien' },
{ title: 'The Cyberiad', author: 'Stanislaw Lem' },
{ title: 'Dune', author: 'Frank Herbert' },
{ title: 'Harry Potter and the Philosopher\'s Stone',
  author: 'J. K. Rowling' },
{ title: 'A Game of Thrones', author: 'George R. R. Martin' } ] */

//filter method
const longbooks = books.filter((book) => book.pages > 500);
longbooks; /* //[ { title: 'The Lord of the Rings', author: 'J. R. R. Tolkien' },
{ title: 'The Cyberiad', author: 'Stanislaw Lem' },
{ title: 'Dune', author: 'Frank Herbert' },
{ title: 'Harry Potter and the Philosopher\'s Stone',
  author: 'J. K. Rowling' },
{ title: 'A Game of Thrones', author: 'George R. R. Martin' } ]
​​​​​at ​​​​​​​​essentialBook​​​ ​My_personal_projects/javascript_concepts/script.js:230:1​

[ { id: 1,
  title: 'The Lord of the Rings',
  publicationDate: '1954-07-29',
  author: 'J. R. R. Tolkien',
  genres: 
   [ 'fantasy',
     'high-fantasy',
     'adventure',
     'fiction',
     'novels',
     'literature' ],
  hasMovieAdaptation: true,
  pages: 1216,
  translations: 
   { spanish: 'El señor de los anillos',
     chinese: '魔戒',
     french: 'Le Seigneur des anneaux' },
  reviews: { goodreads: [Object], librarything: [Object] } },
{ id: 3,
  title: 'Dune',
  publicationDate: '1965-01-01',
  author: 'Frank Herbert',
  genres: [ 'science fiction', 'novel', 'adventure' ],
  hasMovieAdaptation: true,
  pages: 658,
  translations: { spanish: '' },
  reviews: { goodreads: [Object] } },
{ id: 5,
  title: 'A Game of Thrones',
  publicationDate: '1996-08-01',
  author: 'George R. R. Martin',
  genres: [ 'fantasy', 'high-fantasy', 'novel', 'fantasy fiction' ],
  hasMovieAdaptation: true,
  pages: 835,
  translations: 
   { korean: '왕좌의 게임',
     polish: 'Gra o tron',
     portuguese: 'A Guerra dos Tronos',
     spanish: 'Juego de tronos' },
  reviews: { goodreads: [Object], librarything: [Object] } } ] */

//reduce
//its give single element

const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0);
pagesAllBooks; //3227

//sort method
//it always modify original array or mutated
const arr = [3, 7, 1, 9, 5];
const sorted = arr.sort((a, b) => a - b);
sorted;
[1, 3, 5, 7, 9];
const reversed = arr.sort((a, b) => b - a);
reversed;
[9, 7, 5, 3, 1];

const sortedByPages = books.slice().sort((a, b) => b.pages - a.pages);
sortedByPages; // sorted by number of pages in books in descenting object without modify original object because we using slice method

//working with immutable
const newBook = {
  id: 6,
  title: "happy",
  author: "j.k",
};
const booksAfterAdd = [...books, newBook];
booksAfterAdd;

//delete
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);
booksAfterDelete;

const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? {} : book
);
booksAfterUpdate;

//Promise

/* console.log(
  fetch("https://jsonplaceholder.typicode.com/todos").then((res) => res.json()).then(data=>console.log(data))
); */
//first below excute not wating for fetch result
console.log("thiruppathi");
//javascript always move on next statement without waiting for pervious statemets results.so we use async // wait

/*  const y = async ()=>{
  const res =await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json()
  console.log(data)
 }

 y(); */
