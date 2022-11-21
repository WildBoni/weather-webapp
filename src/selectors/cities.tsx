// Search selected cities
//TODO: use something different than object.entries
const selectCityByName = (cities: any, text: any) => {
  return Object.entries(cities).filter((city: any) => {
    const textMatch = city[1].name.toLowerCase().includes(text.toLowerCase());
    return textMatch;
  })
}

const selectCityById = (cities: any, id: string) => {
  return Object.entries(cities).find(city => {
    const textMatch = city[0].includes(id);
    return textMatch;
  })
}

export {selectCityByName, selectCityById}