export interface Option {
    id: string
    text: string
    correct: boolean
  }
  
  export interface Question {
    id: string
    question: string
    options: Option[]
  }