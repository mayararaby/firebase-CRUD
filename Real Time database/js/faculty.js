var path = config.linkPath;

$(function() {
    GetAllFaculties();
})

function GetAllFaculties() {
    $.ajax({
        url: `https://education-cc687-default-rtdb.firebaseio.com/${path}`,
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#AllFaculties>tbody").empty();
            for (var item in data) {
                var row = `<tr>
                        <td>${data[item].name}</td>
                        <td>${data[item].address}</td>

                    </tr>`;
                $("#AllFaculties>tbody").append(row);
            }
            console.log(data)
        },
        error: function(error) {
            console.log(error);
        }
    })

}

function AddFaculty() {
    var name = $("#facultyName").val();
    var address = $("#facultyAddress").val();
    var data = { name: name, address: address };

    $.ajax({
        url: `https://education-cc687-default-rtdb.firebaseio.com/${path}`,
        method: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function(data) {
            console.log(data);
            GetAllFaculties();
            Clear();
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function Clear() {
    $("#facultyName").val("");
    $("#facultyAddress").val("");
}