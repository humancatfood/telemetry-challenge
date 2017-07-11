import ACTIONS from '../actions';



export const defaultConnectionState = {
  landingGear: 0,
  flaps: 0
};


export default (state=defaultConnectionState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_DATA: {
      const { control: {landing_gear, flaps} } = action.payload;

      return {
        ...state,
        landingGear: landing_gear,
        flaps: flaps
      };
    }

    case ACTIONS.TOGGLE_LANDING_GEAR: {
      const { on } = action.payload;

      return {
        ...state,
        landingGear: on
      };
    }

    case ACTIONS.SET_FLAPS_POSITION: {
      const { position } = action.payload;

      return {
        ...state,
        flaps: position
      };
    }

    default:
      return state;

  }

};

