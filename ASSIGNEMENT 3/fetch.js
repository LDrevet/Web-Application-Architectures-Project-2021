//search URL:

var url = "https://api.themoviedb.org/3/search/movie?api_key=e3728d2021937fbf0fd60838c692ff81&language=en-US&query=Wonder%20Woman%201984";
var urlcast = "https://api.themoviedb.org/3/movie/464052/credits?api_key=e3728d2021937fbf0fd60838c692ff81&language=en-US";
const tempt = [];
//BEGINING
const Start = () => {
    fetch(url).then(function (response) {
        if (response.status != 200) {
            console.log("Error: " + response.status);
            return;
        } else {
            response.json().then(function (data) {
                docs = data.results[0];
                document.body.innerHTML +=
                    "<div id='1'><div> Title : " + docs.title + "</div>" +
                    "<div> Year release : " + docs.release_date + "</div>" +
                    "<div> <img src='https://image.tmdb.org/t/p/w500" + docs.poster_path + "'></div></div>" +
                    "<div id='2'><label for='bar'>Enter actor or director of the movie</label>" +
                    "<input id='guess'></input>" +
                    "<a href='#' onclick='Submit(\"" + docs.id + "\")' class='buttonContainer'>Submit my guess</a></div>";
            });
        }
    });
}

//FIRST PART
const actor = async (nom, urlcast) => {
    return fetch(urlcast).then(response => response.json())
        .then(json => {
            docscast = json.cast;
            for (j = 0; j < docscast.length; j++) {
                if (docscast[j].name.toLowerCase() == nom) {
                    var result1 = docscast[j].name;
                    var result2 = docscast[j].profile_path;
                    var result3 = docscast[j].id;
                    return [result1, result2, result3];
                }
            }
        })
}

const dict = async (nom, urlcast) => {
    return fetch(urlcast).then(response => response.json())
        .then(json => {
            docscrew = json.crew;
            for (j = 0; j < docscrew.length; j++) {
                if (docscrew[j].job == "Director") {
                    if (docscrew[j].name.toLowerCase() == nom) {
                        var result1 = docscrew[j].name;
                        var result2 = docscrew[j].profile_path;
                        var result3 = docscrew[j].id;
                        return [result1, result2, result3];
                    }
                }
            }
        })
}


const Submit = async (id) => {
    var nom = document.getElementById("guess").value;
    nom = nom.toLowerCase();
    var urlcast = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=e3728d2021937fbf0fd60838c692ff81&language=en-US";
    console.log(urlcast);
    const ACT = await actor(nom, urlcast);
    const DIRECTOR = await dict(nom, urlcast);
    if (DIRECTOR == undefined && ACT == undefined) {
        document.getElementById("1").innerHTML +=
            "<p id='6' style='color: red'> You got the wrong actor/director</p>"
    }
    if (DIRECTOR != undefined) {
        if (document.getElementById('6') != null) {
            document.getElementById('6').remove()
        }
        ndict = DIRECTOR[0];
        picturedict = DIRECTOR[1];
        directid = DIRECTOR[2];
        if (picturedict != null) {
            document.body.innerHTML +=
                "<div id='6'> Name : " + ndict + "<br></br><img src='https://image.tmdb.org/t/p/w500" + picturedict + "'></div>" +
                "<div id='7'><label for='bar'>Enter movie of the actor/director</label>" +
                "<input id='guess2'></input>" +
                "<a href='#' onclick='Submit2(\"" + directid + "\")' class='buttonContainer2'>Submit my second guess</a></div>";
        }
        if (picturedict == null) {
            document.body.innerHTML +=
                "<div id='6'> Name : " + ndict + "<br></br><div>No picture</div></div>" +
                "<div id='7'><label for='bar'>Enter movie of the actor/director</label>" +
                "<input id='guess2'></input>" +
                "<a href='#' onclick='Submit2(\"" + directid + "\")' class='buttonContainer2'>Submit my second guess</a></div>";
        }

    }
    if (ACT != undefined) {
        if (document.getElementById('6') != null) {
            document.getElementById('6').remove()
        }
        nact = ACT[0];
        pictureact = ACT[1];
        actid = ACT[2];
        if (pictureact != null) {
            document.body.innerHTML +=
                "<div id='6'> Name : " + nact + "<br></br><img src='https://image.tmdb.org/t/p/w500" + pictureact + "'></div>" +
                "<div id='7'><label for='bar'>Enter movie of the actor/director</label>" +
                "<input id='guess2'></input>" +
                "<a href='#' onclick='Submit2(\"" + actid + "\")' class='buttonContainer2'>Submit my second guess</a></div>";
        }
        if (pictureact == null) {
            document.body.innerHTML +=
                "<div id='6'> Name : " + nact + "<br></br><div>No picture</div></div>" +
                "<div id='7'><label for='bar'>Enter movie of the actor/director</label>" +
                "<input id='guess2'></input>" +
                "<a href='#' onclick='Submit2(\"" + actid + "\")' class='buttonContainer2'>Submit my second guess</a></div>";
        }
    }
}

//SECOND PART
const movie = async (movie, urlpeole) => {
    return fetch(urlpeole).then(response => response.json())
        .then(json => {
            docscrew = json.crew;
            for (j = 0; j < docscrew.length; j++) {
                if (docscrew[j].title.toLowerCase() == movie) {
                    var result1 = docscrew[j].title;
                    var result2 = docscrew[j].release_date;
                    var result3 = docscrew[j].poster_path;
                    var result4 = docscrew[j].id;
                    return [result1, result2, result3, result4];
                }
            }
            docscast = json.cast;
            for (j = 0; j < docscast.length; j++) {
                if (docscast[j].title.toLowerCase() == movie) {
                    var result1 = docscast[j].title;
                    var result2 = docscast[j].release_date;
                    var result3 = docscast[j].poster_path;
                    var result4 = docscast[j].id;
                    return [result1, result2, result3, result4];
                }
            }
        })
}

const CountMovie = () => {
    var moviie = document.getElementById("guess2").value;
    moviie = moviie.toLowerCase();
    tempt.push(moviie);
    var match = 0;
    for (i = 0; i < tempt.length; i++) {
        if (tempt[i] == moviie) {
            match += 1;
        }
    }
    return match;
}



const Submit2 = async (id) => {
    var count = CountMovie();
    if (count > 1) {
        document.getElementById("7").innerHTML +=
            "<p id='10' style='color: red'> To easy, pick another movie</p>";
    }
    else {
        var moviie = document.getElementById("guess2").value;
        moviie = moviie.toLowerCase();
        var urlpeole = "https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=e3728d2021937fbf0fd60838c692ff81&language=en-US";
        const MOV = await movie(moviie, urlpeole);
        if (MOV == undefined) {
            if (document.getElementById('10') != null) {
                document.getElementById('10').remove()
            }
            document.getElementById("7").innerHTML +=
                "<p id='10' style='color: red'> You got the wrong movie</p>";
        }
        if (MOV != undefined) {
            if (document.getElementById('10') != null) {
                document.getElementById('10').remove()
            }
            title = MOV[0];
            image = MOV[2];
            date = MOV[1];
            id = MOV[3];
            if (image != null && date != undefined) {
                document.body.innerHTML +=
                    "<div id = '11'><div> Title : " + title + "</div>" +
                    "<div> Year release : " + date + "</div>" +
                    "<div> <img src='https://image.tmdb.org/t/p/w500" + image + "'></div>" +
                    "<a href='#' onclick='Again(\"" + title + "," + image + "," + date + "," + id + "\")' class='buttonContainer3'>TRY AGAIN</a></div></div>";
            }
            if (image == null && date != undefined) {
                document.body.innerHTML +=
                    "<div id = '11'><div> Title : " + title + "</div>" +
                    "<div> Year release : " + date + "</div>" +
                    "<div> NO PICTURE</div>" +
                    "<a href='#' onclick='Again(\"" + title + "," + image + "," + date + "," + id + "\")' class='buttonContainer3'>TRY AGAIN</a></div></div>";
            }
            if (image != null && date == undefined) {
                document.body.innerHTML +=
                    "<div id = '11'><div> Title : " + title + "</div>" +
                    "<div> Year release : No information </div>" +
                    "<div> <img src='https://image.tmdb.org/t/p/w500" + image + "'></div>" +
                    "<a href='#' onclick='Again(\"" + title + "," + image + "," + date + "," + id + "\")' class='buttonContainer3'>TRY AGAIN</a></div></div>";
            }
            if (image == null && date == undefined) {
                document.body.innerHTML +=
                    "<div id = '11'><div> Title : " + title + "</div>" +
                    "<div> Year release : No information </div>" +
                    "<div> NO PICTURE</div>" +
                    "<a href='#' onclick='Again(\"" + title + "," + image + "," + date + "," + id + "\")' class='buttonContainer3'>TRY AGAIN</a></div></div>";
            }


        }
    }
}

//LOOP
const Again = (data) => {
    title = data.split(",")[0];
    image = data.split(",")[1];
    date = data.split(",")[2];
    id = data.split(",")[3];
    for (i = 1; i < 12; i++) {
        if (document.getElementById(i) != null) {
            document.getElementById(i).remove();
        }
    }
    if (image != "null" && date != "undefined") {
        document.body.innerHTML +=
            "<div id='1'><div> Title : " + title + "</div>" +
            "<div> Year release : " + date + "</div>" +
            "<div> <img src='https://image.tmdb.org/t/p/w500" + image + "'></div></div>" +
            "<div id='2'><label for='bar'>Enter actor or director of the movie</label>" +
            "<input id='guess'></input>" +
            "<a href='#' onclick='Submit(\"" + id + "\")' class='buttonContainer'>Submit my guess</a></div>";
    }
    if (image == "null" && date != "undefined") {
        document.body.innerHTML +=
            "<div id='1'><div> Title : " + title + "</div>" +
            "<div> Year release : " + date + "</div>" +
            "<div> NO PICTURE</div>" +
            "<div id='2'><label for='bar'>Enter actor or director of the movie</label>" +
            "<input id='guess'></input>" +
            "<a href='#' onclick='Submit(\"" + id + "\")' class='buttonContainer'>Submit my guess</a></div>";
    }
    if (image != "null" && date == "undefined") {
        document.body.innerHTML +=
            "<div id='1'><div> Title : " + title + "</div>" +
            "<div> Year release : No information </div>" +
            "<div> <img src='https://image.tmdb.org/t/p/w500" + image + "'></div></div>" +
            "<div id='2'><label for='bar'>Enter actor or director of the movie</label>" +
            "<input id='guess'></input>" +
            "<a href='#' onclick='Submit(\"" + id + "\")' class='buttonContainer'>Submit my guess</a></div>";
    }
    if (image == "null" && date == "undefined") {
        document.body.innerHTML +=
            "<div id='1'><div> Title : " + title + "</div>" +
            "<div> Year release : No information </div>" +
            "<div> NO PICTURE</div>" +
            "<div id='2'><label for='bar'>Enter actor or director of the movie</label>" +
            "<input id='guess'></input>" +
            "<a href='#' onclick='Submit(\"" + id + "\")' class='buttonContainer'>Submit my guess</a></div>";
    }

}


