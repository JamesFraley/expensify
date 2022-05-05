import { createStore } from 'redux';

const incrementCount = ({ incrementBy=1})=>({
   type: 'INCREMENT',
   incrementBy: incrementBy
});

const decrementCount = ({ decrementBy=1})=>({
   type: 'DECREMENT',
   decrementBy: decrementBy
});

const setCount = ({ count })=>({
   type: 'SET',
   count: count
});

const resetCount = ()=>({
   type: 'RESET',
   count: 0
});

const countReducer = ( state = { count: 0}, action) => {
   switch (action.type) {
      case 'INCREMENT':
         return { count: state.count + action.incrementBy };
      case 'DECREMENT':
         return { count: state.count - action.decrementBy };
      case 'SET':
         return { count: action.count };
      case 'RESET':
         return { count: 0 };
      default:
         return state;
   }
};

// Set default state of count=0 if nothing is provided.
const store = createStore(countReducer);

const unsubscribe = store.subscribe(()=>{
   console.log("subscribe", store.getState());
})

store.dispatch(incrementCount({ incrementBy: 3 }));
store.dispatch(incrementCount({ incrementBy: 3 }));
store.dispatch(incrementCount({ incrementBy: 3 }));
store.dispatch(decrementCount({ decrementBy: 2 }));
store.dispatch(decrementCount({ decrementBy: 2 }));
store.dispatch(decrementCount({ decrementBy: 2 }));
store.dispatch(setCount({ count: -5 }));
store.dispatch(resetCount());
// store.dispatch({ type: 'INCREMENT', incrementBy: 2 });
// store.dispatch({ type: 'INCREMENT', incrementBy: 1 });
// store.dispatch({ type: 'DECREMENT', decrementBy: 2 });
// store.dispatch({ type: 'DECREMENT' });
// store.dispatch({ type: 'DECREMENT',  decrementBy: 2 });
// store.dispatch({ type: 'RESET' });
