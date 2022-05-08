import { Timestamp } from "firebase/firestore"

export interface Answer {
  id: string
  uid: string
  questionId: string
  body: string
  createdAt: Timestamp
}