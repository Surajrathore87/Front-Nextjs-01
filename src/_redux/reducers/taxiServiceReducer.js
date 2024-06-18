import { BOOKING_SUMMARY_DATA, TAXI_DATA } from "../constants";

const taxiService = (state = { taxiData: {}, bookingData: {} }, action) => {
  switch (action.type) {
    case TAXI_DATA:
      return { ...state, taxiData: action['data'] }
    case BOOKING_SUMMARY_DATA:
      return { ...state, bookingData: action['data'] }
    default:
      return state;
  }
}

export default taxiService;