var users = [];
var tdata = "";
var str = "";
if(localStorage.a_users){
    users = JSON.parse(localStorage.a_users);
    console.log(users.length);
    for(var i=0; i<users.length; i++){
        str = `<tr><td>${users[i].username}</td><td>${users[i].email}</td><td>${users[i].gender}</td><td>${users[i].company}</td><td>${users[i].location}</td></tr>`;
        tdata += str;
    }
    if (document.contains(document.getElementById("users_table"))) {
        document.getElementById("users_table").remove();
        createTable();
    }else{
        createTable();
    }  
}


function checkValidations(idelement,warning)
{
    if (document.getElementById(idelement).value == "") {
        if (!document.contains(document.getElementById(warning))) {
            document.getElementById(idelement).insertAdjacentHTML("afterend", '<p id=' + warning+' style="color:red;">Check username '+idelement+'</p>');
        }
    } else if (document.contains(document.getElementById(warning))) {
        document.getElementById(warning).remove();
    }

}

document.getElementById("save").addEventListener('click', function () {

    checkValidations("username","warning1");
    checkValidations("password","warning2");
    checkValidations("email","warning3");
    checkValidations("company","warning4");
    checkValidations("location","warning5");
    
    if (document.getElementById('male').checked === false && document.getElementById('female').checked === false) {
        if (!document.contains(document.getElementById("warning6"))) {
            document.getElementById("female").insertAdjacentHTML("afterend", '<p id="warning6" class="warning" style="color:red;">Select your gender</p>');
        }       
    } else if (document.contains(document.getElementById("gen_warning6"))) {
        document.getElementById("gen_warning6").remove();
    }

    if(document.querySelectorAll('[id^="warning"]').length == 0){
        var user = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value,
            gender: document.getElementById("male").checked? "male" : "female",
            company: document.getElementById("company").value,
            location: document.getElementById("location").value
        };
        console.log(user);
        users.push(user);

        str = `<tr><td>${users[users.length-1].username}</td><td>${users[users.length-1].email}</td><td>${users[users.length-1].gender}</td><td>${users[users.length-1].company}</td><td>${users[users.length-1].location}</td></tr>`;
        tdata += str;    
        if (document.contains(document.getElementById("users_table"))) {
            document.getElementById("users_table").remove();
            createTable();
        }else{
            createTable();
        }
        localStorage.a_users = JSON.stringify(users);
    }
});

function createTable(){
    document.getElementById("tablearea").insertAdjacentHTML("beforeend", `<table id="users_table" ><tr><th>Username</th><th>email</th><th>Gender</th><th>Company</th><th>Location</th></tr>${tdata}</table>`);
} 