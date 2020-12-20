
var nameFriend = document.getElementById("inpName");
var phoneFriend = document.getElementById("inpPhone");
var typeFriend = document.getElementById("inpType");
var forms = document.querySelectorAll(".form-group");
var btn = document.getElementById("mybtn");
var alrts_name = document.getElementById("alerts-name");
var alrts_phone = document.getElementById("alerts-phone");
var alerts_all = document.getElementById("alerts-all");
var alert_type =document.getElementById("alerts-type");
var ar;

if (localStorage.getItem("friends") == null) {
    ar = [];
} else {
    ar = JSON.parse(localStorage.getItem("friends"));
    displayData();
}

function gatData() {
    if (nameFriend.value == "" || phoneFriend.value == "" || typeFriend.value == "") {
        alert_all.style.display = "block";
        btn.setAttribute("disabled", "disabled");

    } else {
        alert_all.style.display = "none";
        btn.removeAttribute("disabled", "disabled")
        var obj = {
            name: nameFriend.value,
            phone: phoneFriend.value,
            type: typeFriend.value
        }
        ar.push(obj);
        console.log(ar)
        localStorage.setItem("friends", JSON.stringify(ar));
        displayData();
        clearform();
    }
}
function displayData() {
    var cartona = '';
    for (var i = 0; i < ar.length; i++) {
        cartona += `
                <tr>
                    <td>`+ (i + 1) + `</td>
                    <td>`+ ar[i].name + `</td>
                    <td>`+ ar[i].phone + `</td>
                    <td>`+ ar[i].type + `</td>
                    <td><button onclick="deleteData(`+ i + `)" class="btn btn-danger">Delete</button></td>
                    <td><button onclick="updataData(`+ i + `)" class="btn btn-primary">UpData</button></td>
                </tr>`
    }
    document.getElementById("rowData").innerHTML = cartona;


}
function clearform() {
    // for (var i = 0; i < forms.length; i++) {
    //     forms[i].value = " ";
    // }
    nameFriend.value = "";
    phoneFriend.value = "";
    typeFriend.value = "";

}
function deleteData(i) {
    ar.splice(i, 1);
    displayData();
    localStorage.setItem("friends", JSON.stringify(ar));


}
function updataData(i) {
    nameFriend.value = ar[i].name;
    phoneFriend.value = ar[i].phone;
    typeFriend.value = ar[i].type;
    btn.innerHTML = "Updating";
    btn.onclick = function () {

        ar[i].name = nameFriend.value;
        ar[i].phone = phoneFriend.value;
        ar[i].type = typeFriend.value;
        localStorage.setItem("friends", JSON.stringify(ar));
        displayData();
        clearform();
        btn.innerHTML = "Add Friend";
        btn.onclick = gatData;
    }

}

function searchData(trem) {
    var cart = ``;
    for (var i = 0; i < ar.length; i++) {
        if (ar[i].name.toLowerCase().includes(trem.toLowerCase()) == true) {

            cart += `   <tr>
                <td>`+ (i + 1) + `</td>
                <td>`+ ar[i].name.replace(trem.toLowerCase(),
                ` <span style="background-color:yellow;">
                    ${trem.toLowerCase()}</span>`
            ) + `</td>
                <td>`+ ar[i].phone + `</td>
                <td>`+ ar[i].type + `</td>
                <td><button onclick="deleteData(`+ i + `)" class="btn btn-danger">Delete</button></td>
                <td><button onclick="updataData(`+ i + `)" class="btn btn-primary">UpData</button></td>
                </tr>`
        }

    }
    document.getElementById("rowData").innerHTML = cart;
}
nameFriend.addEventListener("keyup", regxName);
function regxName() {
    var reg = /^[A-Z]{1}[a-z]{1,} *[A-Za-z]{1,}$/;
    if (reg.test(nameFriend.value) == true) {
        nameFriend.classList.add("is-valid");
        nameFriend.classList.remove("is-invalid");
        alrts_name.style.display = "none";
        btn.removeAttribute("disabled");
        alert_all.style.display = "none";



    } else {
        nameFriend.classList.add("is-invalid");
        nameFriend.classList.remove("is-valid");
        alrts_name.style.display = "block";
        btn.setAttribute("disabled", "disabled")


    }

}
phoneFriend.addEventListener("keyup", regxphone);

function regxphone() {
    var regphone = /^(012|010|011|015)[0-9]{8}$/;
    if (regphone.test(phoneFriend.value) == true) {
        phoneFriend.classList.add("is-valid");
        phoneFriend.classList.remove("is-invalid");
        alrts_phone.style.display = "none";
        btn.removeAttribute("disabled");
        alert_all.style.display = "none";


    } else {
        phoneFriend.classList.add("is-invalid");
        phoneFriend.classList.remove("is-valid");
        alrts_phone.style.display = "block";
        btn.setAttribute("disabled", "disabled")
    }
}
typeFriend.addEventListener("keyup", regxType)
function regxType() {
    var regType = /^(good|bad|v.good)$/;
    if (regType.test(typeFriend.value) == true) {
        typeFriend.classList.add("is-valid");
        typeFriend.classList.remove("is-invalid");
        alert_type.style.display = "none";
    } else {
        typeFriend.classList.add("is-invalid");
        typeFriend.classList.remove("is-valid");
        alert_type.style.display = "block";
    }
}