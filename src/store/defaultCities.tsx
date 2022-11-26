//Setting up 3 default cities for displaying purposes
interface City {
  name: string,
  id: number
}

export const defaultCities: {
  selectedCity: number,
  cities: {
    [key: string]: City
  }
} = {
  selectedCity: 2643743,
  cities: {
    '3173435':  {
      name: 'Milan',
      id: 3173435
    },
    '2643743': {
      name: 'London',
      id: 2643743  
    },
    '292223': {
      name: 'Dubai',
      id: 292223
    }
  }
}
