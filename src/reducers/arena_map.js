const arenaMapReducer=(state=[],action)=>{
    var new_state=[...state]
    switch(action.type){
      case 'INITIALISE':
        var i,j;
        if(state.length===0){
            for(i=0;i<action.n;i++){
                var x=[];
                for(j=0;j<action.n;j++){
                    x.push("#fff");
                }
                new_state.push(x);
            }
        }else{
            for(i=0;i<action.n;i++){
                for(j=0;j<action.n;j++){
                    new_state[i][j]='#fff'
                }
            }
        }
        return new_state;
      case 'OBSTACLE':
        new_state[action.i][action.j]='#000'
        return new_state;
      case 'START':
        new_state[action.i][action.j]='#f00'
        return new_state;
      case 'GOAL':
        new_state[action.i][action.j]='#0f0'
        return new_state;
      case 'IN_OPEN':
        new_state[action.i][action.j]='#ff0'
        return new_state;
      case 'IN_CLOSE':
        new_state[action.i][action.j]='#0ff'
        return new_state;
      case 'IN_PATH':
        new_state[action.i][action.j]='#00f'
        return new_state;
      default: return new_state;
    }
  };
  
  export default arenaMapReducer;
  