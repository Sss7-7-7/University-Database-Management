import staffdb, { bulkcreat, getData, createEle } from "./modelsem5.js";

let db = staffdb("staffdb", {
  staff: `++id,name,branch,subject,phonenumber,adress,mail`,
});

// input tages

const userid = document.getElementById("userid");
const staffname = document.getElementById("staffname");
const branch = document.getElementById("branch");
const subject = document.getElementById("subject");
const phonenumber = document.getElementById("phonenumber");
const adress = document.getElementById("adress");
const mail = document.getElementById("mail");

// buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// not found

const notfound = document.getElementById("notfound");

//insert value by using create button
btncreate.onclick = (event) => {
  let flag = bulkcreat(db.staff, {
    name: staffname.value,
    branch: branch.value,
    subject: subject.value,
    phonenumber: phonenumber.value,
    adress: adress.value,
    mail: mail.value,
  });

  staffname.value =
    userid.value =
    branch.value =
    subject.value =
    phonenumber.value =
    adress.value =
    mail.value =
      "";

  getData(db.staff, (data) => {
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
    db.staff
      .update(id, {
        // id: userid.value,
        name: staffname.value,
        branch: branch.value,
        subject: subject.value,
        phonenumber: phonenumber.value,
        adress: adress.value,
        mail: mail.value,
      })
      .then((updated) => {
        // let get = updated ? `data updated ` : `data not updated`;
        let get = updated ? `true` : `false`;

        let updatemsg = document.querySelector(".updatemsg");

        getMsg(get, updatemsg);

        staffname.value =
          userid.value =
          branch.value =
          subject.value =
          phonenumber.value =
          adress.value =
          mail.value =
            "";
      });
  }
};

// delete button function
btndelete.onclick = () => {
  db.delete();
  db = staffdb("staffdb", {
    staff: `++id,name,branch,subject,phonenumber,adress,mail`,
  });
  db.open();
  table();
  textID(userid);

  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
};

// window onload
window.onload = () => {
  textid(userid);
};

function textid(textboid) {
  getData(db.staff, (data) => {
    textboid.value = data.id + 1 || 1;
  });
}

function table() {
  const tbody = document.getElementById("tbody");

  // this function reading onle one time when the function call it will remove child element
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  getData(db.staff, (data) => {
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

  db.staff.get(id, (data) => {
    userid.value = data.id || 0;
    staffname.value = data.name;
    // branch.value = data.value;
    subject.value = data.subject;
    phonenumber.value = data.phonenumber;
    adress.value = data.adress;
    mail.value = data.mail;
    branch.value = data.branch || "";
  });
}

function deletbtn(event) {
  let id = parseInt(event.target.dataset.id);
  db.staff.delete(id);
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
