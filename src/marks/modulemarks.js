const marksdb = (dbname, table) => {
  // create data base
  const db = new Dexie("marks");
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
    usn: sortobj.usn,
    name: sortobj.name,
    branch: sortobj.branch,
    sem: sortobj.sem,
    sec: sortobj.sec,

    sem1: sortobj.sem1,
    sem2: sortobj.sem2,
    sem3: sortobj.sem3,
    sem4: sortobj.sem4,
    sem5: sortobj.sem5,
    sem6: sortobj.sem6,
  };
  return obj;
};

const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};

export default marksdb;

export { bulkcreat, getData, createEle };
