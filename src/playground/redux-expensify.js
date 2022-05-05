import { createStore, combineReducers } from "redux";
import uuid from 'uuid';

//Action Generators
const addExpense = ({ description='', note='',amount=0.00, createdAt=0}={})=>(
   {
   type: 'ADD_EXPENSE',
   expense: {
      id: uuid(),
      description: description,
      note: note,
      amount: amount,
      createdAt: createdAt
   }
});

const editExpense = ( id, updates )=>({
   type: 'EDIT_EXPENSE',
   id: id,
   updates: updates
   }
);

const removeExpense = ( id )=>(
   {
   type: 'REMOVE_EXPENSE',
   id: id
   }
);

const setTextFilter = ( newTextFilter )=>(
   {
   type: 'SET_TEXT_FILTER',
   text: newTextFilter
   }
);

const sortByDate = () => ({
   type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
   type: 'SORT_BY_AMOUNT'
});

const setStartDate = (startDate) =>({
   type: 'SET_START_DATE',
   startDate: startDate
})

const setEndDate = (endDate) =>({
   type: 'SET_END_DATE',
   endDate: endDate
})

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state=expensesReducerDefaultState, action)=>{
   switch (action.type) {
      case 'ADD_EXPENSE':
         return [
            ...state,
            action.expense
         ];
      case 'REMOVE_EXPENSE':
         const newState = state.filter(s=>s.id !== action.id);
         return newState;
      case 'EDIT_EXPENSE':
         return state.map((expense)=>{
            if (expense.id === action.id){
               return {
                  ...expense,
                  ...action.updates
               }
            } else {
               return expense;
            };
         })
      default:
         return state;
   }
}

// Filters Reducer
const filtersReducerDefaultState = {
   text: '',
   sortBy: 'date',
   startDate: undefined,
   endDate: undefined
};
const filtersReducer = (state=filtersReducerDefaultState, action)=>{
   switch (action.type) {
      case 'SET_TEXT_FILTER':
         return {
            ...state,
            text: action.text
         }
      case 'SORT_BY_DATE':
         return {
            ...state,
            sortBy: 'date'
         }
      case 'SORT_BY_AMOUNT':
         return {
            ...state,
            sortBy: 'amount'
         }
      case 'SET_START_DATE':
         return {
            ...state,
            startDate: action.startDate
         }
      case 'SET_END_DATE':
         return {
            ...state,
            endDate: action.endDate
         }
      default:
         return state;
   };
};

// Get Visible Expenses
const getVisibleExpenses=(expenses, {text, sortBy, startDate, endDate})=>{
   return expenses.filter((expense)=>{
      const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =   typeof endDate   !== 'number' || expense.createdAt <= endDate;
      const textMatch=expense.description.toLowerCase().includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch
   }).sort((a, b)=>{
      if  (sortBy === 'date') {
         return a.createdAt < b.createdAt ? 1 : -1;
      };
      if (sortBy === 'amount'){
         return a.amount < b.amount ? 1 : -1;
      };
   });
};

const store = createStore(
   combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
   })
);

store.subscribe(()=>{
   const state = store.getState();
   const visibleExpenses=getVisibleExpenses(state.expenses, state.filters);
   console.log("visibleExpenses", visibleExpenses);
});

const expenseOne   = store.dispatch(addExpense({description: 'Rent',   amount: 1000, createdAt: 0 }));
const expenseTwo   = store.dispatch(addExpense({description: 'Coffee', amount: 300,  createdAt: 0 }));
const expenseThree = store.dispatch(addExpense({description: 'Coffee', amount: 600,  createdAt: 0 }));
const expenseFour  = store.dispatch(addExpense({description: 'pot',    amount: 10,   createdAt: 0 }));

//store.dispatch(removeExpense(expenseOne.expense.id));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500 }));

//store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter('coffee'));
store.dispatch(setTextFilter(''));
store.dispatch(sortByAmount());  // sortBy=amount
store.dispatch(sortByDate());    // sortBy=date
// store.dispatch(sortByAmount());  // sortBy=amount
// console.log("--------------------------------------------");
//store.dispatch(setStartDate(0));  // startDate=125
// store.dispatch(setStartDate());     // startDate=undefined
//store.dispatch(setEndDate(1250));   // endDate=1250
// store.dispatch(setEndDate());       // endDate=undefined


// const demoState = {
//    expenses: [{
//       id: 'a',
//       description: 'Jan expense',
//       note: 'This was the final payment',
//       amount: 54500,
//       createdAt: 0
//    }],
//    filters: {
//       text: 'rent',
//       sortBy: 'amount', //date or amount
//       startDate: undefined,
//       endDate: undefined
//    }
// };
