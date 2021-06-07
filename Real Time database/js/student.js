var firebaseConfig = config.firebaseConfig;

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
database.ref('/faculty').on('value', (snapshot) => {
    availableFaculties(snapshot.val())
})

function availableFaculties(data) {
    $("#availableFaculties").empty();
    for (var item in data) {
        var row = `<option>${data[item].name}</option>`;
        $("#availableFaculties").append(row);
    }

}

database.ref('/student').on('value', (snapshot) => {
    displayStudents(snapshot.val())
})


function displayStudents(data) {
    $("#AllStudents>tbody").empty();
    for (var item in data) {
        var row = `<tr>
                            <td>${data[item].firstName}</td>
                            <td>${data[item].lastName}</td>
                            <td>${(data[item].studentAge)}</td>
                            <td>${(data[item].studentFaculty)}</td>
                            <td>
                                <button type="button" class="btn btn-warning" onclick="GetStudentByID('${item}')">Update</button>
                                <button type="button" class="btn btn-danger" onclick="DeleteStudent('${item}')">Delete</button>
                            </td>
                        </tr>`;
        $("#AllStudents>tbody").append(row);
    }
}

function GetStudentByID(studentID) {
    database.ref().child("student").child(studentID).get().then((snapshot) => {
        var data = snapshot.val();
        $("#studentID").val(studentID);
        $("#firstName").val(data.firstName);
        $("#lastName").val(data.lastName);
        $("#studentAge").val(data.studentAge);
        $("#availableFaculties").val(data.studentFaculty);
    })
}

function AddStudent() {
    var id = $("#studentID").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var studentAge = $("#studentAge").val();
    var studentFaculty = $("#availableFaculties").val();
    var data = { firstName: firstName, lastName: lastName, studentAge: studentAge, studentFaculty: studentFaculty };
    console.log(data);
    if (id == "") {
        database.ref().child('student').push(data);
    } else {
        var updates = {};
        updates["/student/" + id] = data;
        database.ref().update(updates);
    }

    Clear();
}

function Clear() {
    $("#studentID").val("");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#studentAge").val("");
    $("#availableFaculties").val("");
}

function DeleteStudent(studentID) {
    var sure = confirm("Are tou sure?");
    if (sure) {
        var updates = {};
        updates["/student/" + studentID] = null;
        database.ref().update(updates);
    }
}