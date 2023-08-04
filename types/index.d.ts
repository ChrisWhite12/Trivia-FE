interface Question {
  id: number
  title: string
  categoryId: number
  category?: {
    name: string
  }
  correct: int
  answers: string[]
}

interface Category {
  id: number
  name: string
}