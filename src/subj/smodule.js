const studentsubdb = (dbname, table) => {
  // create data base
  const db = new Dexie("studentssub");
  db.version(1).stores(table);
  db.open();

  return db;
};

// insert function
const bulkcreat = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("data inserted ");
  } else {
    console.log("please provide data ");
  }
  return flag;
};

//check text box validation
const empty = (object) => {
  let flag = false;

  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value) == true) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
};

// getData from the database
const getData = (dbname, fn) => {
  let index = 0;
  let obj = {};
  dbname.count((count) => {
    if (count) {
      dbname.each((table) => {
        obj = SortObj(table);
        fn(obj, index++);
      });
    } else {
      fn(0);
    }
  });
};

const SortObj = (sortobj) => {
  let obj = {};
  obj = {
    id: sortobj.id,
    courseid: sortobj.courseid,
    coursename: sortobj.coursename,
    noofsubjects: sortobj.noofsubjects,
  };
  return obj;
};

const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};

export default studentsubdb;

export { bulkcreat, getData, createEle };
