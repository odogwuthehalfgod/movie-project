import { apiKey } from "./config.js";

let emojiGenre = {
  Action: "🔥",
  Comedy: "😂",
  Crime: "🕵️‍♀️",
  Fantasy: "🦄",
  Adventure: "🗻",
  Thriller: "😲",
  Horror: "😈",
  Family: "👨‍👩‍👧‍👦",
  Animation: "🤓",
  "Science Fiction": "🔬",
  Drama: "🎭",
  History: "📚",
  Western: "🤠",
  War: "🔫",
  Music: "🎵",
  Mystery: "🔮",
  Romance: "💘",
};

let state = {
  movies: {},
  addToList: [],
};

function styleSettings(movArr, el) {
  if (movArr) {
    el.style.color = "blue";

    el.innerHTML = "Added to My List";
  }
}

export class genesisApp {
  queryString = decodeURIComponent(window.location.search);
  newInsert = document.querySelector(".overlay");
  backgroundImg = document.querySelector(".big-bg");

  likedMovies = [];
  data;

  getIdFromUrl() {
    this.queryString = this.queryString.substring(1);

    return this.queryString;
  }

  async apiCall(key) {
    let dataFetch = await fetch(key);

    let dataFetchJson = await dataFetch.json();

    return dataFetchJson;
  }

  async actualRender() {
    let testing = await this.apiCall(`https://api.themoviedb.org/3/movie/${cinema.getIdFromUrl()}?api_key=${apiKey}`);

    console.log(testing);

    this.pricing(testing);

    state.movies = testing;
    this.render(testing);
  }

  render(data) {
    this.data = data;

    const markup = this.generateMarkup();
    this.newInsert.insertAdjacentHTML("afterbegin", markup);
  }

  async setBgImage() {
    let bgInfo = await this.apiCall(`https://api.themoviedb.org/3/movie/${this.queryString}/images?api_key=${apiKey}`);
    this.backgroundImg.style.backgroundImage = `${
      bgInfo.backdrops.length == 0
        ? "none"
        : ` linear-gradient(185deg, transparent, #0a1016 95%),
            linear-gradient(to bottom, transparent, #0a1016 95%), url(https://image.tmdb.org/t/p/original/${bgInfo.backdrops?.[0].file_path})`
    }`;
  }

  generateMarkup() {
    return `<div class="movie-info" data-type="newInCinema">
                    <div class="cont movie-art">
                        <img src="https://image.tmdb.org/t/p/original/${this.data.poster_path}" alt="" id="animg"/>

                        <div class="trailer-side">
                              
                              <a onclick="" class="trailer-link" id="trailer-links">Watch Trailer</a>
                          </div>

                    </div>
                    <div class="cont second">
                        <h1>${this.data.title}</h1>
                        <p>Rating: ${this.data.vote_average}/10</p>
                            <div class="rate">
                                <div class="love">Add to My List</div>
                                <div class="like">Like</div>
                                <div class="track">Set Reminder</div>
                            </div>
                        <div class="overview">
                            <p>${this.data.overview}</p>

                            <div class="gen">
                                ${this.data.genres
                                  .map(function (gen) {
                                    return `<span class="mov" data-id=${
                                      gen.id
                                    }>${gen.name} <div class="emoji">${emojiGenre[gen.name]}</div></span>`;
                                  })
                                  .join("")}
                            </div>
                            
                            <div class="price"><p class="price-p">Price: ${this.data.pricing}</p>
                     
                            <button>Buy Ticket</button></div>
                        </div>
                    </div>
              </div>`;
  }

  async getTrailer(urlID) {
    let vc = [];
    let trailer = await this.apiCall(
      `https://api.themoviedb.org/3/movie/${urlID}/videos?api_key=${apiKey}`
      // `https://api.themoviedb.org/3/movie/${this.queryString}/videos?api_key=${apiKey}`
    );

    trailer.results.find(function (el, i) {
      if (el.type === "Trailer") {
        // console.log([el], i);
        vc.push(el);
      }
    });

    console.log(vc[0].key);

    console.log(trailer);

    let box = document.querySelector(".popup-trailer");

    box.style.display = `block`;

    setTimeout(function () {
      box.style.transitionProperty = `opacity`;
      box.style.transitionTimingFunction = `cubic-bezier(0.075, 0.82, 0.165, 1)`;
      box.style.transitionDuration = `1s`;
      box.style.opacity = 1;
      box.style.zIndex = 99999;
    }, 20);

    // let tFrame = `<iframe src=https://www.youtube.com/embed/${trailer.results[0].key}></iframe>`;
    let tFrame = `<iframe src=https://www.youtube.com/embed/${vc[0].key}></iframe>`;

    box.insertAdjacentHTML("afterbegin", tFrame);
  }

  addToMyList() {
    this.newInsert.addEventListener("click", function (e) {
      let addClick = e.target.closest(".love");

      if (!addClick) return;

      //Add to my list
      state.movies.addedToMyList = true;
      state.addToList.push(state.movies);
      let fd;
      let fe = [];

      fd = JSON.parse(localStorage.getItem("fav"));
      fe.push(fd);
      fe.push(state.addToList);

      localStorage.setItem("fav", JSON.stringify(fe));

      //Mark current movie as add to my list

      if (+cinema.queryString === state.movies.id) {
        state.movies.addedToMyList = true;

        styleSettings(state.movies.addedToMyList, addClick);
      }
    });
  }

  loadNotification() {
    let getStorage = JSON.parse(localStorage.getItem("fav"));

    cinema.renderNotification(getStorage[0]);
  }

  pricing(movieReleaseDate) {
    let date = new Date();
    let curMonth = date.getMonth() + 1;

    let mrd = movieReleaseDate.release_date.split("-");

    if (+mrd[1] < curMonth - 2) {
      movieReleaseDate.pricing = 2000;
    } else {
      movieReleaseDate.pricing = 3500;
    }
  }
}

class MyList extends genesisApp {
  newInsert = document.querySelector(".mylist-notification");

  generateMarkup() {
    return `
    <div class="local" data-id="${this.data.id}">
      <div class="poster"><img src="https://image.tmdb.org/t/p/original/${this.data?.poster_path}" alt="" id="img"/></div>
        <div class="movie-title">
       
        <p>${this.data.title}</p>
        </div>
    </div>
      `;
  }

  getLocalStorageData() {
    loadData.map(function (ind) {
      if (ind == null) {
        return;
      } else {
        myWatchList.render(ind);
      }
    });
  }
}

//Local storage stuff here/////////
// console.log(localStorageFunc().length);

// localStorageFunc().map(function (el, i) {
//   if (i <= localStorageFunc().length) {
//     console.log(i);
//   }
// });

function localStorageFunc() {
  let localData;
  if (localStorage.getItem("fav") == null) {
    localStorage.setItem("fav", JSON.stringify(0));
  } else if (localStorage.getItem("fav").length == 1) {
    // localData = {
    //   localGet: JSON.parse(localStorage.getItem("fav")),
    // };
    return;
  } else {
    localData = {
      localGet: JSON.parse(localStorage.getItem("fav")),
      flatten: JSON.parse(localStorage.getItem("fav")).flat(100).length,
    };
    return localData.localGet.flat(localData.flatten);
  }
}

let loadData = localStorageFunc();

// console.log(loadData, 1);

//////////////////////////////////

let cinema = new genesisApp();
let myWatchList = new MyList();

window.addEventListener("load", function () {
  cinema.actualRender();
  cinema.setBgImage();
  cinema.addToMyList();

  myWatchList.getLocalStorageData();

  loadData.find(function (el) {
    if (el == null) {
      return;
    } else {
      if (el.id === +cinema.queryString) {
        setTimeout(function () {
          console.log(0);
          var lists = document.querySelector(".love");

          styleSettings(el.addedToMyList, lists);
        }, 2000);
      }
    }
  });
  // console.log(document.readyState);

  setTimeout(() => {
    console.log("hey there");
    document.querySelector(".trailer-link").addEventListener("click", function (e) {
      document.querySelector(".cont-trail").style.display = "block";
      // document.querySelector(".popup-trailer").style.display = "block";
      document.querySelector(".close").style.opacity = 1;

      cinema.getTrailer(cinema.queryString);
    });
  }, 2000);
});

document.querySelector(".close").addEventListener("click", function (e) {
  document.querySelector(".popup-trailer").innerHTML = "";
  document.querySelector(".cont-trail").style.display = "none";
  document.querySelector(".popup-trailer").style.display = "none";
  document.querySelector(".close").style.opacity = 0;
});
document.querySelector(".my-list").addEventListener("click", function (e) {
  document.querySelector(".mylist-notification").classList.toggle("show-grid");
});

document.querySelector(".mylist-notification").addEventListener("click", function (e) {
  let movId = e.target.closest(".local").dataset.id;

  let c = localStorageFunc();

  let removed = c.splice(c.indexOf(null), 1);

  c.forEach(function (el) {
    if (+movId == el.id) {
      console.log(el);
      document.querySelector(".overlay").innerHTML = "";
      cinema.render(el);
      styleSettings(el.addedToMyList, document.querySelector(".love"));
      document.querySelector(".trailer-link").onclick = function () {
        cinema.getTrailer(el.id);
      };
    }
  });
});

//mycolor.space, fontsinthewild.com, lapa.ninja
