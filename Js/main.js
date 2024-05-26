
//VARIABLES

var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var searchUrl = document.getElementById('searchUrl');
var submitButton = document.getElementById('submitButton');
var updateButton = document.getElementById('updateButton');
var siteRow = document.getElementById('siteRow');
var siteList;


//LOCAL STORAGE
if (localStorage.getItem('list') == null)
    siteList = []
else {
    siteList = JSON.parse(localStorage.getItem('list'));

    display(siteList)

}

//BUTTON ONCLICK FUNCTION

submitButton.onclick = function () {
    submit();
    clearForm();
    display(siteList);

}

//SUNMIT FUNCTION

function submit() {
    if(Validation(siteName)&&Validation(siteUrl)){
    var siteInfo = {
        sName: siteName.value,
        sUrl: siteUrl.value,
    }

    siteList.push(siteInfo);
    localStorage.setItem('list', JSON.stringify(siteList));
    console.log(siteList);
}
}

//CLEAR FUNCTION

function clearForm() {
    siteName.value = null;
    siteUrl.value = null;
}

//DISPLAY FUNCTION

function display(list) {
    var box = '';
    for (var i = 0; i < list.length; i++) {
        box += `            <div class="col-3">
        <h3 class="h6">${i + 1}</h3>
    </div>
    <div class="col-3">
        <h3 class="h6">${list[i].sName}</h3>
    </div>
    <div class="col-3">
        <a href="${list[i].sUrl}" target="_blank" class="btn btn-outline-success"><i class="fa-solid fa-eye"></i> Visit</a>
    </div>
    <div class="col-3">
        <button class="h6 btn btn-outline-info" type="button"  onclick="editForUpdate(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="h6 btn btn-outline-danger" type="button"  onclick="deleteFun(${i})"><i class="fa-solid fa-trash-can"></i></button>
    </div>`
       
    }

    siteRow.innerHTML = box;
}

//DELETE FUNCTION

function deleteFun(index) {
    siteList.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(siteList));
    display(siteList);
}


//UPDATE FUNCTION 

var globalIndex;

function editForUpdate(index) {
    globalIndex = index;
    updateButton.classList.remove('disabled');
    submitButton.classList.add('disabled');
    siteName.value = siteList[index].sName;
    siteUrl.value = siteList[index].sUrl;
}

function updateFun(){
    siteList[globalIndex].sName = siteName.value;
    siteList[globalIndex].sUrl = siteUrl.value;
    localStorage.setItem('list', JSON.stringify(siteList));
    updateButton.classList.add('disabled');
    submitButton.classList.remove('disabled');
    display(siteList);
}

updateButton.onclick = function(){
    updateFun();
}


//SEARCH FUNCTION 

function searchFun(){

    var term = searchUrl.value.trim().toLowerCase();
    var searchedArray = [];
    for (let i = 0; i < siteList.length; i++) {
        if (siteList[i].sName.trim().toLowerCase().includes(term) == true) {
            searchedArray.push(siteList[i])
        }
    }
    console.log(searchedArray);
    display(searchedArray);

}

searchUrl.oninput = function (){
    searchFun();
}

//FORM VALIDATION

function Validation(ele) {

    var Regex = {
        siteName: /^[A-Z][a-z]{3,15}$/,
        siteUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    };

    if(Regex[ele.id].test(ele.value)){
        ele.classList.add('is-valid');
        ele.classList.remove('is-invalid');
        ele.nextElementSibling.classList.replace('d-block', 'd-none');
        return true
    }
    else{
        ele.classList.add('is-invalid');
        ele.classList.remove('is-valid');
        ele.nextElementSibling.classList.replace('d-none', 'd-block');
        return false
    }
}



//DARKMODE THEME

var icon = document.getElementById('icon');

icon.onclick = function() {
    document.body.classList.toggle('dark-theme');

    if(document.body.classList.contains('dark-theme')){
        icon.src = "./Assets/dark theme icon/sun.png";
    }
    else{
        icon.src = "./Assets/dark theme icon/moon.png";
    }

}