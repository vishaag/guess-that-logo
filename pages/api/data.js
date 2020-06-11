const data = [
  { id: 1, img: '/img1.svg', options: ['Vue','React','Ember','Deno'] }, 
  { id: 2, img: '/img2.svg', options: ['Electron','Node','Vue','React'] }, 
  { id: 3, img: '/img3.svg', options: ['Angular','Elm','Rust','Apollo'] }, 
  { id: 4, img: '/img4.svg', options: ['Node','Elm','Rust','TypeScript'] }, 
  { id: 5, img: '/img5.svg', options: ['Javascript','TypeScript','Rust','Apollo'] }, 
  { id: 6, img: '/img6.svg', options: ['Hasura','NextJS','Rust','Reason'] }, 
  { id: 7, img: '/img7.svg', options: ['Firebase','Elm','Node','Flutter'] }, 
  { id: 8, img: '/img8.svg', options: ['Firebase','Elm','Apollo','Flutter'] }, 
  { id: 9, img: '/img9.svg', options: ['RedwoodJS','NextJS','Gatsby','Node'] }, 
  { id: 10, img: '/img10.svg', options: ['Babel','Rust','Greensock','Gatsby'] }, 
  { id: 11, img: '/img11.svg', options: ['TypeScript','Rust','Firebase','Bootstrap'] }, 
]

export default function handler(req, res) {
  res.status(200).json(data)
}