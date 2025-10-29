import type { Event } from '@/types'

// Mock数据
const mockEvents: Event[] = [
  {
    id: 1,
    category: 'animal welfare',
    title: 'Cat Adoption Day',
    description: 'Find your new feline friend at this event.',
    location: 'Meow Town',
    date: 'January 28, 2022',
    time: '12:00',
    petsAllowed: true,
    organizer: 'Kat Laydee'
  },
  {
    id: 2,
    category: 'community',
    title: 'Neighborhood Cleanup',
    description: 'Help us keep our community clean and beautiful.',
    location: 'Central Park',
    date: 'February 15, 2022',
    time: '09:00',
    petsAllowed: true,
    organizer: 'Community Association'
  },
  {
    id: 3,
    category: 'education',
    title: 'Coding Workshop',
    description: 'Learn the basics of web development in this hands-on workshop.',
    location: 'Tech Center',
    date: 'March 10, 2022',
    time: '14:00',
    petsAllowed: false,
    organizer: 'Tech Education Group'
  },
  {
    id: 4,
    category: 'health',
    title: 'Yoga in the Park',
    description: 'Relax and stretch with our free outdoor yoga session.',
    location: 'Riverside Park',
    date: 'April 5, 2022',
    time: '08:00',
    petsAllowed: true,
    organizer: 'Mindful Yoga Studio'
  },
  {
    id: 5,
    category: 'environment',
    title: 'Tree Planting Drive',
    description: 'Join us in planting trees to help the environment.',
    location: 'Green Valley',
    date: 'May 20, 2022',
    time: '10:00',
    petsAllowed: true,
    organizer: 'Eco Warriors'
  }
]

// 注意：当前使用mock数据实现，暂不需要实际的API客户端

export default {
  getEvents(perPage: Number, page: Number) {
    // 使用mock数据替代实际API调用
    return new Promise((resolve) => {
      const startIndex = (Number(page) - 1) * Number(perPage)
      const endIndex = startIndex + Number(perPage)
      const paginatedEvents = mockEvents.slice(startIndex, endIndex)
      
      resolve({
        data: paginatedEvents,
        headers: {
          'x-total-count': mockEvents.length.toString()
        }
      })
    })
  },
  
  getEvent(id: number) {
    // 使用mock数据替代实际API调用
    return new Promise((resolve, reject) => {
      const event = mockEvents.find(e => e.id === id)
      if (event) {
        resolve({ data: event })
      } else {
        reject({ response: { status: 404 } })
      }
    })
  }
}
