const axios = require('axios');

const base_url = 'https://marta-bff-dot-marta-tech.appspot.com/station/';

export const station_list = [
  'AIRPORT STATION',
  'ARTS CENTER STATION',
  'ASHBY STATION',
  'AVONDALE STATION',
  'BANKHEAD STATION',
  'BROOKHAVEN STATION',
  'BUCKHEAD STATION',
  'CHAMBLEE STATION',
  'CIVIC CENTER STATION',
  'COLLEGE PARK STATION',
  'DECATUR STATION',
  'DORAVILLE STATION',
  'DUNWOODY STATION',
  'EAST LAKE STATION',
  'EAST POINT STATION',
  'EDGEWOOD CANDLER PARK STATION',
  'FIVE POINTS STATION',
  'GARNETT STATION',
  'GEORGIA STATE STATION',
  'HAMILTON E HOLMES STATION',
  'INDIAN CREEK STATION',
  'INMAN PARK STATION',
  'KENSINGTON STATION',
  'KING MEMORIAL STATION',
  'LAKEWOOD STATION',
  'LENOX STATION',
  'LINDBERGH STATION',
  'MEDICAL CENTER STATION',
  'MIDTOWN STATION',
  'NORTH AVE STATION',
  'NORTH SPRINGS STATION',
  'OAKLAND CITY STATION',
  'OMNI DOME STATION',
  'PEACHTREE CENTER STATION',
  'SANDY SPRINGS STATION',
  'VINE CITY STATION',
  'WEST END STATION',
  'WEST LAKE STATION'
];

export async function getTrainArrivalsByStation(station) {
  let url = base_url + station + "/table";
  let result = await axios.get(url)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error)
      });
  return result;
}
