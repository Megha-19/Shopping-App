import Data from '../../components/Data';

const initialState = {
   product : Data
  };
  
  export default (state = initialState, action) => {
  switch(action.type){
      default:
          return state;
  }  
}
