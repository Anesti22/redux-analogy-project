console.clear();

// People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
    return {//Action (a form in our analogy)
       type: 'CREATE_POLICY',
       payload: {
         name: name,
         amount: amount
       }
    };
};

const deletePolicy = (name) => {
    return {//Action (Dlelete a policy)
       type: 'DELETE_POLICY',
       payload: {
         name: name
       }
    };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM', 
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

// Reducers (like departments)

const claimHistory = (oldListOfClaims = [], action) => {
  if(action.type === 'CREATE_CLAIM') {
    // We care about this action (FORM!)
    return [...oldListOfClaims, action.payload];
  }
   // We don't care about this action (FORM!)
  return oldListOfClaims;
};

// Reducers (like departments)

const accounting = (bagOfMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect
  } else if (action.type === 'CREATE_POLICY') {
      return bagOfMoney + action.payload.amount       
  }
  
  return bagOfMoney;
};


const policies = (listOfPolicies = [], action) => {
    if(action.type === 'CREATE_POLICY') {
      return [...listOfPolicies, action.payload.name];
    } else if(action.type === 'DELETE_POLICY') {
      listOfPolicies.filter(name => name !== action.payload.name);
    }
    
  return listOfPolicies;
};

const {createStore, combineReducers} = Redux;

const ourdepartments = combineReducers({
   accounting: accounting,
  claimHistory: claimHistory,
  policies: policies
  
});

const store = createStore(ourdepartments);

store.dispatch(createPolicy('Nesti', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Jane', 40));

store.dispatch(createClaim('Jane', 120));
store.dispatch(createPolicy('Jim', 10));

store.dispatch(deletePolicy('Nesti', 120));




console.log(store.getState());