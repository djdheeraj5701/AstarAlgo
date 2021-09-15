const operationReducer=(state="",action)=>{
  var new_op;
  new_op=(action.type.includes(" ")?action.type.split(" ")[1]:state)
  return new_op
};

export default operationReducer;
