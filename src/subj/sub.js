import studentsubdb, { bulkcreat, getData, createEle } from "./smodule.js";

let db = studentsubdb("studentsubdb", {
  studentssub: `++id,courseid,coursename,noofsubjects`,
});

// input tages

const userid = document.getElementById("userid");
const courseid = document.getElementById("courseid");
const coursename = document.getElementById("coursename");
const noofsubjects = document.getElementById("noofsubjects");

// buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// not found

const notfound = document.getElementById("notfound");

//insert value by using create button
btncreate.onclick = (event) => {
  let flag = bulkcreat(db.studentssub, {
    courseid: courseid.value,
    coursename: coursename.value,
    noofsubjects: noofsubjects.value,
  });

  courseid.value = coursename.value = noofsubjects.value = userid.value = "";

  getData(db.studentssub, (data) => {
    // userid.value = data.id + 1 || 1;
  });

  table();

  let insetmsg = document.querySelector(".insertmsg");

  getMsg(flag, insetmsg);
};

// function for button read ///////////////////////

btnread.onclick = table;

// update function /////////////

btnupdate.onclick = () => {
  const id = parseInt(userid.value || 0);

  if (id) {
    db.studentssub
      .update(id, {
        // id: userid.value,
        courseid: courseid.value,
        coursename: coursename.value,
        noofsubjects: noofsubjects.value,
      })
      .then((updated) => {
        // let get = updated ? `data updated ` : `data not updated`;
        let get = updated ? `true` : `false`;

        let updatemsg = document.querySelector(".updatemsg");

        getMsg(get, updatemsg);

        userid.value = courseid.value = coursename = noofsubjects = "";
      });
  }
};

// delete button function
btndelete.onclick = () => {
  db.delete();
  db = studentsubdb("studentsubdb", {
    studentssub: `++id,courseid,coursename,noofsubjects`,
  });
  db.open();
  table();
  // textID(userid);

  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
};

// window onload
window.onload = () => {
  textid(userid);
};

function textid(textboid) {
  getData(db.studentssub, (data) => {
    textboid.value = data.id + 1 || 1;
  });
}

function table() {
  const tbody = document.getElementById("tbody");

  // this function reading onle one time when the function call it will remove child element
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  getData(db.studentssub, (data) => {
    if (data) {
      createEle("tr", tbody, (tr) => {
        for (const value in data) {
          createEle("td", tr, (td) => {
            td.textContent = data[value];
          });
        }
        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-eye btnedit";
            i.setAttribute(`data-id`, data.id);
            i.onclick = editbtn;
          });
        });
        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute(`data-id`, data.id);

            i.onclick = deletbtn;
          });
        });
      });
    } else {
      notfound.textContent = "No Records Found";
    }
  });
}

function editbtn(event) {
  let id = parseInt(event.target.dataset.id);

  db.studentssub.get(id, (data) => {
    userid.value = data.id || 0;
    courseid.value = data.courseid;
    coursename.value = data.coursename;
    noofsubjects.value = data.noofsubjects;
  });
}

function deletbtn(event) {
  let id = parseInt(event.target.dataset.id);
  db.studentssub.delete(id);
  table();
}

// function msg
function getMsg(flag, element) {
  if (flag) {
    // call msg
    element.className += " movedown";

    setTimeout(() => {
      element.classList.forEach((classname) => {
        classname == "movedown"
          ? undefined
          : element.classList.remove("movedown");
      });
    }, 4000);
  }
}
