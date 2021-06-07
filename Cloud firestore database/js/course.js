var firebaseConfig = config.firebaseConfig;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.collection("Courses").onSnapshot((result) => {
    displayCourses(result);
})

function displayCourses(data) {
    $("#allCourses>tbody").empty();
    data.forEach((doc) => {
        var info = doc.data();
        var row = `<tr>
                        <td>${info.courseName}</td>
                        <td>${info.finalMark}</td>
                        <td>${info.courseHours}</td>
                        <td>${info.Available}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick="getOneCourse('${doc.id}')" >Update</button>
                            <button type="button" class="btn btn-secondary" onclick="deleteCourse('${doc.id}')">Delete</button>
                        </td>
                    </tr>`;
        $("#allCourses>tbody").append(row);
    })
}

function addCourse() {
    var ID = $("#courseId").val();
    var courseName = $("#courseName").val();
    var finalMark = parseInt($("#finalMark").val());
    var courseHours = parseInt($("#courseHours").val());
    var Available = $("#Available").is(':checked');

    var newCourse = {
        courseName: courseName,
        finalMark: finalMark,
        courseHours: courseHours,
        Available: Available
    }

    if (ID == "") {
        db.collection("Courses").add(newCourse)
            .then(function(response) {
                Clear();
            })
            .catch(function(error) {
                console.log(error);
            });
    } else {
        db.collection("Courses").doc(ID).update(newCourse)
            .then((result) => {
                console.log("Done");
                Clear();
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function Clear() {
    $("#courseId").val("");
    $("#courseName").val("");
    $("#finalMark").val("");
    $("#courseHours").val("");
    $("#Available").prop('checked', true);
}

function getOneCourse(courseId) {
    db.collection("Courses").doc(courseId).get().then((result) => {
        var info = result.data();
        $("#courseId").val(courseId);
        $("#courseName").val(info.courseName);
        $("#finalMark").val(info.finalMark);
        $("#courseHours").val(info.courseHours);
        (info.Available == true) ? ($("#Available").prop('checked', true)) : ($("#Available").prop('checked', false));
    })
}


function deleteCourse(courseId) {
    var sure = confirm("Are You Sure?");
    if (sure) {
        db.collection("Courses").doc(courseId).delete()
            .then(() => {
                console.log("Deleted")
            })
            .catch((error) => {
                console.log(error)
            });
    }
}