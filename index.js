let db = `{}`;

let obj = JSON.parse(db);

function createGroup(groupName) {
  let obj = JSON.parse(db);
  if (obj[groupName] != undefined) {
    return `Enter valid Group Name, "${groupName}" is already exists, Error in createGroup Function`;
  }
  obj[groupName] = {
    members: [],
  };

  db = JSON.stringify(obj);
  return `group- ${groupName} created`;
}

function addMember(groupName, memberName) {
  obj = JSON.parse(db);
  if (obj[groupName] == undefined) {
    console.log(
      `Enter valid Group Name, "${groupName}" is not valid group name, Error in addMember Function`
    );
    return;
  }
  let arr = obj[groupName].members;
  let memberdetails = {
    name: memberName,
    expense: 0,
  };
  arr.push(memberdetails);
  obj[groupName].members = arr;
  db = JSON.stringify(obj);
  return `added member- ${memberName} in group- ${groupName} `;
}

function addExpense(groupName, memberName, expense) {
  obj = JSON.parse(db);
  if (obj[groupName] == undefined) {
    console.log(
      `Enter valid Group Name, "${groupName}" is not valid group name, Error in addExpense Function`
    );
    return;
  }
  let flag = true;
  obj[groupName].members = obj[groupName].members.map((user) => {
    if (user.name === memberName) {
      user.expense = expense;
      flag = false;
    }

    return user;
  });
  if (flag == false) {
    db = JSON.stringify(obj);
    return db;
  } else {
    return `Enter valid Member Name, "${memberName}" is not valid Member name, Error in addExpense Function`;
  }
}

function splitExpenses(groupName) {
  obj = JSON.parse(db);
  let expenseSum = 0;
  if (obj[groupName] == undefined) {
    return `Enter valid Group Name, "${groupName}" is not valid group name, Error in splitExpense Function`;
  }
  for (let i = 0; i < obj[groupName].members.length; i++) {
    expenseSum += obj[groupName].members[i].expense;
  }
  let splitAmount = expenseSum / obj[groupName].members.length;

  var arr = [];

  for (let i = 0; i < obj[groupName].members.length; i++) {
    let ob = obj[groupName].members[i];
    ob["taken/-given"] = splitAmount - obj[groupName].members[i].expense;
    ob.expense = splitAmount;
    arr.push(ob);
  }

  return arr;
}

function main(groupName, membersName) {
  let obj = JSON.parse(db);

  if (obj[groupName] != undefined) {
    return `Enter valid Group Name, "${groupName}" is already exists, Error in main Function`;
  } else {
    var arr = [];

    for (let i = 0; i < membersName.length; i++) {
      let ob = {
        name: membersName[i],
        expense: 30,
      };
      arr.push(ob);
    }
    obj[groupName] = {
      members: arr,
    };
  }
  db = JSON.stringify(obj);
  return db;
}
console.log(createGroup("gurdeep")); // create a group with name gurdeep
console.log(addMember("gurdeep", "gurdeep 1")); // adding a member
console.log(addMember("gurdeep", "gurdeep 2")); // adding a member
console.log(addMember("gurdeep", "gurdeep 3")); // adding a member
console.log(addExpense("gurdeep", "gurdeep 2", 56)); //adding expense to member- gurdeep 2 of group-gurdeep
console.log(splitExpenses("gurdeep")); // spliting expenses
console.log(main("main Group", ["main 1", "main 2"])); // creating group and adding members from main function

console.log(db);// printing whole json database
