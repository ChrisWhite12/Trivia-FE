interface Question {
  id: number
  title: string
  categoryId: number
  correct: int
  answers: string[]
}

interface Category {
  id: number
  name: string
}