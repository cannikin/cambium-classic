export const photos = [
  { id: 1, filename: 'DSCF0915.jpg' },
  { id: 2, filename: 'DSCF1557.jpg' },
  { id: 3, filename: 'DSCF1636.jpg' },
  { id: 4, filename: 'DSCF2398.jpg' },
  { id: 5, filename: 'DSCF0947.jpg' },
  { id: 6, filename: 'DSF0293.jpg' },
  { id: 7, filename: 'DSF0401.jpg' },
  { id: 8, filename: 'DSF2603.jpg' },
  { id: 9, filename: 'DSF2737.jpg' },
  { id: 10, filename: 'DSF2765.jpg' },
  { id: 11, filename: 'DSF2770.jpg' },
  { id: 12, filename: 'DSF4281.jpg' },
  { id: 13, filename: 'DSF4361.jpg' },
  { id: 14, filename: 'DSF4385.jpg' },
  { id: 15, filename: 'DSF4486.jpg' },
  { id: 16, filename: 'IMG_1270.jpg' },
  { id: 17, filename: 'IMG_5484.jpg' },
  { id: 18, filename: 'IMG_5512.jpg' },
  { id: 19, filename: 'IMG_6549.jpg' },
  { id: 20, filename: 'IMG_7945.jpg' },
]

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
