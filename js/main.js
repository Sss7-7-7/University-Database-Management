import studentdb, { bulkcreat, getData, createEle } from "./module.js";

let db = studentdb("studentdb", {
  students: `++id,usn,name,branch,sem,sec,phonenumber,adress,mail,age`,
});

// input tages

const userid = document.getElementById("userid");
const usn = document.getElementById("usn");
const studentname = document.getElementById("studentname");
const sem = document.getElementById("sem");
const branch = document.getElementById("branch");
const phonenumber = document.getElementById("phonenumber");
const adress = document.getElementById("adress");
const sec = document.getElementById("sec");
const mail = document.getElementById("mail");
const age = document.getElementById("age");

// buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// not found

const notfound = document.getElementById("notfound");

//insert value by using create button
btncreate.onclick = (event) => {
  let flag = bulkcreat(db.students, {
    name: studentname.value,
    usn: usn.value,
    sec: sec.value,
    sem: sem.value,
    branch: branch.value,
    phonenumber: phonenumber.value,
    adress: adress.value,
    mail: mail.value,
    age: age.value,
  });

  studentname.value =
    usn.value =
    userid.value =
    sem.value =
    branch.value =
    phonenumber.value =
    adress.value =
    sec.value =
    mail.value =
    age.value =
      "";

  getData(db.students, (data) => {
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
    db.students
      .update(id, {
        // id: userid.value,
        name: studentname.value,
        usn: usn.value,
        sem: sem.value,
        branch: branch.value,
        phonenumber: phonenumber.value,
        adress: adress.value,
        sec: sec.value,
        mail: mail.value,
        age: age.value,
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
          phonenumber.value =
          adress.value =
          sec.value =
          mail.value =
          age.value =
            "";
      });
  }
};

// delete button function
btndelete.onclick = () => {
  db.delete();
  db = studentdb("studentdb", {
    students: `++id,usn,name,branch,sem,sec,phonenumber,adress,mail,age`,
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
  getData(db.students, (data) => {
    textboid.value = data.id + 1 || 1;
  });
}

function table() {
  const tbody = document.getElementById("tbody");

  // this function reading onle one time when the function call it will remove child element
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  getData(db.students, (data) => {
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

  db.students.get(id, (data) => {
    userid.value = data.id || 0;
    studentname.value = data.name;
    usn.value = data.usn;
    sec.value = data.sec;
    phonenumber.value = data.phonenumber;
    adress.value = data.adress;
    mail.value = data.mail;
    age.value = data.age;
    sem.value = data.sem || "";
    branch.value = data.branch || "";
  });
}

function deletbtn(event) {
  let id = parseInt(event.target.dataset.id);
  db.students.delete(id);
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
