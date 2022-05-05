import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, editExpense, removeExpense } from './actions/expenses';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses'

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
const expenseOne   = store.dispatch(addExpense({description: 'Water Bill', amount: 1000, createdAt: 1000 }));
const expenseTwo   = store.dispatch(addExpense({description: 'Gas Bill',   amount: 5000, createdAt: 5000 }));
const afterFilter  = store.dispatch(setTextFilter('gas bill'));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

console.log("afterFilter", afterFilter);
console.log("visibleExpenses", visibleExpenses);

console.log(store.getState());

let app=document.getElementById('app');
ReactDOM.render(<AppRouter/>, app);