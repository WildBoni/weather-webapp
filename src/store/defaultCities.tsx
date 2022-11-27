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
  selectedCity: 2780741,
  cities: {
    '3173435':  {
      name: 'Milan',
      id: 3173435
    },
    '2643743': {
      name: 'London',
      id: 2643743  
    },
    '2780741': {
      name: 'Dornbirn',
      id: 2780741
    }
  }
}
