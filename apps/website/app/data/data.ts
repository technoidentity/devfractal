import type { Course, Video } from '@prisma/client'
import { v4 as uuid } from 'uuid'

export const reactCourse: Course = {
  id: uuid(),
  title: 'React fundamentals',
  description:
    'This course is for React newbies and anyone looking to build a solid foundation. It’s designed to teach you everything you need to start building web applications in React right away.',
}

export const reactVideos: Video[] = [
  {
    id: uuid(),
    courseId: reactCourse.id,
    url: 'https://www.youtube.com/watch?v=s2skans2dP4',
    title: "Beginner's guide to React",
    description:
      'A list of the core concepts every React developer should have a solid grasp on.',
  },
  {
    id: uuid(),
    courseId: reactCourse.id,
    url: 'https://www.youtube.com/watch?v=0jlTw2XI7I8',
    title: 'React Hooks',
    description:
      'Hooks are functions that let you “hook into” React state and lifecycle features from function components.',
  },
  {
    id: uuid(),
    courseId: reactCourse.id,
    url: 'https://www.youtube.com/watch?v=zpUMRsAO6-Y',
    title: 'State Management in React',
    description:
      'As your application grows, it helps to be more intentional about how your state is organized and how the data flows between your components.',
  },
  {
    id: uuid(),
    courseId: reactCourse.id,
    url: 'https://www.youtube.com/watch?v=AiJ8tRRH0f8',
    title: 'Simply React',
    description:
      'Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
  },
]
