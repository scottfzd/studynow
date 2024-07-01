import { DeckType } from '@/types/DeckContext.type'
import { QuizzType } from '@/types/QuizzContext.type'
import { TagsType } from '@/types/TagsContext.type'
import { UserContextType } from '@/types/UserContext.type'


// mock tag data
export const mockTagsData: TagsType[] = [
  {
    name: "history"
  },
  {
    name: "french"
  },
  {
    name: "maths"
  },
  {
    name: "science"
  },
  {
    name: "english"
  },
]

// mock user data
export const mockUsersData: UserContextType[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    isSubscribed: false,
    email_verified_at: null,
    created_at: "01/07/2024",
    updated_at:"01/07/2024"
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "user",
    isSubscribed: false,
    email_verified_at: null,
    created_at: "01/07/2024",
    updated_at:"01/07/2024"
  },
  {
    name: "James Doe",
    email: "jane.doe@example.com",
    role: "user",
    isSubscribed: true,
    email_verified_at: "01/07/2024",
    created_at: "01/07/2024",
    updated_at:"01/07/2024"
  },
]

// mock quizz data
export const mockQuizzData: QuizzType[] = [
  {
    name: "world war 2",
    visibility: "public",
    likes: 3,
    tags: mockTagsData[0],
    owner: mockUsersData[0],
    type: "quizz"
  },
  {
    name: "grammar",
    visibility: "public",
    likes: 10,
    tags: mockTagsData[1],
    owner: mockUsersData[2],
    type: "quizz"
  },
  {
    name: "Pythagore",
    visibility: "public",
    likes: 50,
    tags: mockTagsData[2],
    owner: mockUsersData[1],
    type: "quizz"
  },
]

// mock quizz data
export const mockDeckData: DeckType[] = [
  {
    name: "Napoleon",
    visibility: "public",
    likes: 7,
    tags: mockTagsData[0],
    owner: mockUsersData[0],
    type: "deck"
  },
  {
    name: "COD",
    visibility: "public",
    likes: 15,
    tags: mockTagsData[1],
    owner: mockUsersData[2],
    type: "deck"
  },
  {
    name: "Thales",
    visibility: "public",
    likes: 34,
    tags: mockTagsData[2],
    owner: mockUsersData[1],
    type: "deck"
  },
]
