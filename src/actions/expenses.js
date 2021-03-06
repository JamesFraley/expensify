import uuid from 'uuid';

export const addExpense = ({ description='', note='',amount=0.00, createdAt=0}={})=>(
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

export const editExpense = ( id, updates )=>({
   type: 'EDIT_EXPENSE',
   id: id,
   updates: updates
   }
);

export const removeExpense = ( id )=>(
   {
   type: 'REMOVE_EXPENSE',
   id: id
   }
);
