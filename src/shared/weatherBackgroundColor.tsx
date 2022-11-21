// the function receives a weather icon and selects a proper background color
let weatherBackgroundColor = (icon: string): string => {
  let cardColor: string = '';

	switch (icon) {
		case '01d':
		case '01n':
			cardColor = 'sunny';
			break;
		case '02d':
		case '02n':
		case '10d':
		case '10n':
			cardColor = 'mixed';
			break;
		case '03d':
		case '03n':
		case '04d':
		case '04n':
		case '09d':
		case '09n':
		case '11d':
		case '11n':
		case '13d':
		case '13n':
		case '50d':
		case '50n':
			cardColor = 'cloudy';
			break;
		default:
			cardColor = 'sunny';
			break;
  }

  return cardColor;
}

export {weatherBackgroundColor};