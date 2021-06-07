var firebaseConfig = config.firebaseConfig;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


db.collection("Courses").onSnapshot((result) => {
    displayFields(result);
})


function displayFields(data) {
    $("#courseName").empty();
    data.forEach((doc) => {
        var info = doc.data();
        var row = `<option>${info.courseName}</option>`;
        $("#courseName").append(row);
    })

}
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
                    </tr>`;
        $("#allCourses>tbody").append(row);
    })
}

function search() {
    var courseName = $("#courseName").val();
    var finalOprator = $("#finalOprator").val();
    var mark = $("#mark").val();
    var HourseOprator = $("#HourseOprator").val();
    var Hours = parseInt($("#Hours").val());
    var AvailableType = $("#AvailableType").val();

    var course = {
        courseName: courseName,
        finalOprator: finalOprator,
        mark: mark,
        HourseOprator: HourseOprator,
        Hours: Hours,
        AvailableType: AvailableType
    }
    db.collection("Courses")
        .where("courseName", "==", courseName)
        .where("courseHours", HourseOprator, Hours)
        .get()
        .then((result) => { displayCourses(result) })
        .catch((error) => { console.log(error) })
    console.log(HourseOprator)
    console.log(Hours)
    console.log(courseName)


}