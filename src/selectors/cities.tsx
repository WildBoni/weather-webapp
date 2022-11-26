// Search selected cities
//TODO: use something different than object.entries
const selectCityByName = (cities: any, text: any) => {
  return cities.filter((city: any) => {
    const textMatch = city.name.toLowerCase().includes(text.toLowerCase());
    return textMatch;
  })
}

const selectCityById = (cities: any, id: string) => {
  return cities.find((city: any) => {
    const textMatch = city.id === id;
    return textMatch;
  })
}

export {selectCityByName, selectCityById}