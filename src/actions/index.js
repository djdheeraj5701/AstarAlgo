export const map_initialise=(n)=>{
  return{
    type:"INITIALISE",
    n:n
  }
}

export const map_obstacle=(i,j)=>{
  return{
    type:"OBSTACLE",
    i:i,
    j:j
  }
}

export const map_start=(i,j)=>{
  return{
    type:'START',
    i:i,
    j:j
  }
}

export const map_goal=(i,j)=>{
  return{
    type:'GOAL',
    i:i,
    j:j
  }
}