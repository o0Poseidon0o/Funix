// REDUCERS
// Là 1 function
const initValue = { value: 0 };

const rootReducer = (state = initValue, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        value: state.value + 1,
      };

    // =>{
    // value:1
    // }
    // state.value=state.value+1;
    // return state;

    // Math.random(),Date.now()
    // Request toi server

    // PURE FUNCTION
    default:
      return state;
  }
};
// ACTION
const INCREMENT = {
  // Mô tả actionlaf gì
  type: " todolist/increment",
  payload,
};
// Action creators
const increamentCreator = () => {
  return {
    type: "todolist/increment",
    payload: data,
  };
};
increamentCreator(10);
// DISPATCH
// là 1 function

dispatch(INCREMENT);
