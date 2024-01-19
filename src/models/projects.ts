export interface Project {
  id: number
  title: string
  slug: string
  categories: Category[]
  source: string
  releaseYear: number
  description: string
  url: string
  thumbnail: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export type Projects = Project[]