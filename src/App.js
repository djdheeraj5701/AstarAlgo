import { Col, Row } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { map_goal, map_initialise, map_obstacle, map_start } from './actions';
class Cell{
  constructor(x,y){
      this.parent=null
      this.x=x;this.y=y
      this.g_cost=0;this.h_cost=0;this.f_cost=0;
      this.neigbors=[]
      for(var i=-1;i<2;i++){
          for(var j=-1;j<2;j++){
              if(i===j && i===0){}
              else{
                  this.neigbors.push([x+i,y+j])
              }
          }
      }
  }
  set_cost(prev,goal){
      var dist_1=Math.floor(Math.pow(Math.pow(this.x-prev.x,2)+Math.pow(this.y-prev.y,2),0.5)*10)
      this.g_cost=prev.g_cost+dist_1
      var dist_2=Math.floor(Math.pow(Math.pow(this.x-goal[0],2)+Math.pow(this.y-goal[1],2),0.5)*10)
      this.h_cost=dist_2
      this.f_cost=this.g_cost+this.h_cost
  }
}

function App() {
  const delay = require('delay');
  
  const dispatch=useDispatch();
  const arena=useSelector(state=>state.arena_map);
  const operation=useSelector(state=>state.operation)
  return (
    <div className="App">
      <div style={{
            margin:'5%',
        }}>
            <Col>{
                arena.map((row,i)=>{
                    return(
                        <Row>{
                            row.map((cell,j)=>{
                                return(
                                    <button 
                                    onClick={()=>{
                                      switch(operation){
                                        case 'OBSTACLE':dispatch(map_obstacle(i,j)); break;
                                        case 'START':dispatch(map_start(i,j)); break;
                                        case 'GOAL':dispatch(map_goal(i,j)); break;
                                        default:;
                                      }
                                    }}
                                    style={{
                                        width: 30, height: 30,
                                        backgroundColor: cell,
                                        borderColor: "black",
                                        padding: 2
                                    }}>
                                    </button>
                                )
                            })
                        }</Row>
                    )
                })
            }</Col>
            <button onClick={()=>dispatch(map_initialise(18))}>INITIALISE</button>
            <button onClick={()=>dispatch({type:'SET OBSTACLE'})}>OBSTACLE</button>
            <button onClick={()=>dispatch({type:'SET START'})}>START</button>
            <button onClick={()=>dispatch({type:'SET GOAL'})}>GOAL</button>
            <button onClick={async()=>{
                var start=[],goal=[],obstacles=[];
                arena.forEach((row,i) => {
                  row.forEach((value,j)=>{
                    switch(value){
                      case '#000':obstacles.push([i,j]);break;
                      case '#f00':start=[i,j];break;
                      case '#0f0':goal=[i,j];break;
                      default:;
                    }
                  })
                });
                // console.log(start)
                // console.log(goal)
                // console.log(obstacles)
    var open=[]
    var closed=[]
    var path=[]
    open.push(new Cell(start[0],start[1]))

    while(true){
        var m=0
        for(var i=0;i<open.length;i++){
            if(open[i].f_cost<open[m].f_cost){
                m=i
            }else if(open[i].f_cost === open[m].f_cost && open[i].h_cost < open[m].h_cost){
                m=i
            }
        }
        var curr=open[m]
        open.splice(m,1)
        closed.push([curr.x,curr.y])
        if(curr.x===goal[0] && curr.y===goal[1]){
            while(curr.parent!=null){
                path.push([curr.x,curr.y])
                curr=curr.parent
            }
            break;
        }
        dispatch({type:'IN_CLOSE',i:curr.x,j:curr.y})
        await delay(250)

        curr.neigbors.forEach(async(pos)=>{
            var m=-1
            for(var i=0;i<obstacles.length;i++){
              if(obstacles[i][0]===pos[0] && obstacles[i][1]===pos[1]){
                m=i
                break
              }
            }
            if(m===-1){
                var nbr=new Cell(pos[0],pos[1])
                m=-1
                for(i=0;i<obstacles.length;i++){
                  if(obstacles[i][0]===pos[0] && obstacles[i][1]===pos[1]){
                    m=i
                    break
                  }
                }
                if(m===-1){
                    nbr.set_cost(curr,goal)
                    m=-1
                    for(i=0;i<open.length;i++){
                        if(nbr.x===open[i].x && nbr.y===open[i].y){
                            if (nbr.g_cost < open[i].g_cost){
                                open[i].g_cost = nbr.g_cost
                                open[i].f_cost = nbr.f_cost
                                open[i].parent=curr
                            }
                            m=i
                            break
                        }
                    }
                    if(m===-1){
                        nbr.parent=curr
                        open.push(nbr)
                        dispatch({type:'IN_OPEN',i:nbr.x,j:nbr.y})
                        await delay(250)
                    }
                }
            }
        })
    }
    path.forEach(async(item)=>{
      dispatch({type:'IN_PATH',i:item[0],j:item[1]})
      await delay(250)
    })
    dispatch({type:'START',i:start[0],j:start[1]})
    await delay(250)
    dispatch({type:'GOAL',i:goal[0],j:goal[1]})
    await delay(250)
              }}>SOLVE</button>
        </div>
    </div>
  );
}

export default App;
