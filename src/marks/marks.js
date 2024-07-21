import marksdb, { bulkcreat, getData, createEle } from ".//modulemarks.js";

let db = marksdb("marksdb", {
  marks: `++id,usn,name,branch,sem,sec,sem1,sem2,sem3,sem4,sem5,sem6`,
});

// input tages

const userid = document.getElementById("userid");
const usn = document.getElementById("usn");
const studentname = document.getElementById("studentname");
const sem = document.getElementById("sem");
const branch = document.getElementById("branch");
const sem1 = document.getElementById("sem1");
const sec = document.getElementById("sec");
const sem4 = document.getElementById("sem4");
const sem3 = document.getElementById("sem3");
const sem2 = document.getElementById("sem2");
const sem5 = document.getElementById("sem5");
const sem6 = document.getElementById("sem6");
// const totalcgpa = document.getElementById("totalcgpa");

// buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// not found

const notfound = document.getElementById("notfound");

//insert value by using create button
btncreate.onclick = (event) => {
  let flag = bulkcreat(db.marks, {
    name: studentname.value,
    usn: usn.value,
    sec: sec.value,
    sem: sem.value,
    branch: branch.value,

    sem1: sem1.value,
    sem2: sem2.value,
    sem3: sem3.value,
    sem4: sem4.value,
    sem5: sem5.value,
    sem6: sem6.value,
    // totalcgpa: totalcgpa.value,
  });

  studentname.value =
    usn.value =
    userid.value =
    sem.value =
    branch.value =
    sec.value =
    sem1.value =
    sem2.value =
    sem3.value =
    sem4.value =
    sem5.value =
    sem6.value =
      // totalcgpa.value =
      "";

  getData(db.marks, (data) => {
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
    db.marks
      .update(id, {
        // id: userid.value,
        name: studentname.value,
        usn: usn.value,
        sem: sem.value,
        branch: branch.value,

        sec: sec.value,
        sem1: sem1.value,
        sem2: sem2.value,
        sem3: sem3.value,
        sem4: sem4.value,
        sem5: sem5.value,
        sem6: sem6.value,
        // totalcgpa: totalcgpa.value,
      })
      .then((updated) => {
        // let get = updated ? `data updated ` : `data not updated`;
        let get = updated ? `true` : `false`;

        let updatemsg = document.querySelector(".updatemsg");

        getMsg(get, updatemsg);

        studentname.value =
          usn.value =
          userid.value =
          sem.value =
          branch.value =
          sec.value =
          sem1.value =
          sem2.value =
          sem3.value =
          sem4.value =
          sem5.value =
          sem6.value =
            // totalcgpa.value =
            "";
      });
  }
};

// delete button function
btndelete.onclick = () => {
  db.delete();
  db = marksdb("marksdb", {
    marks: `++id,usn,name,branch,sem,sec,sem1,sem2,sem3,sem4,sem5,sem6`,
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
  getData(db.marks, (data) => {
    textboid.value = data.id + 1 || 1;
  });
}

const totalcgpas = sem1 + sem2 + sem3 + sem4;

function table() {
  const tbody = document.getElementById("tbody");

  // this function reading onle one time when the function call it will remove child element
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  getData(db.marks, (data) => {
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

  db.marks.get(id, (data) => {
    userid.value = data.id || 0;
    studentname.value = data.name;
    usn.value = data.usn;
    sec.value = data.sec;
    sem1.value = data.sem1;
    sem2.value = data.sem2;
    sem3.value = data.sem3;
    sem4.value = data.sem4;
    sem5.value = data.sem5;
    sem6.value = data.sem6;
    // totalcgpa.value = data.totalcgpa;

    sem.value = data.sem || "";
    branch.value = data.branch || "";
  });
}

function deletbtn(event) {
  let id = parseInt(event.target.dataset.id);
  db.marks.delete(id);
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
