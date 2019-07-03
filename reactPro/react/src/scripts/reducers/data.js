


const defaultState = {
  manga:[],
  goods:[],
  classify:[],
  poll:[]
}

export default (state=defaultState,action)=>{

  // console.log(action)
  switch(action.type){

    case "getManga":
      return {...state,manga:action.manga }
      break;

    case "getGoods":
      return {...state,goods:action.goods}
      break;
    
      case "getAll":
        return {...state,classify:action.classify}
        break;
      
        case "pollGood":
          return {...state,poll:action.poll}
          break;

        case "setList":
          return {}
          break;

    
    default:
    return state;
    break;
    
  }
}