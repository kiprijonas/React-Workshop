import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const initialState =  {
  selectedGif: null,
  modalIsOpen: false
};

export default function modal(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        // Add code here to open the gif modal window (should be two lines)
      };
    case CLOSE_MODAL:
      return {
        ...state,
        // Add code here to close the gif modal window (should be two lines)
      };
    default:
      return state;
  }
}