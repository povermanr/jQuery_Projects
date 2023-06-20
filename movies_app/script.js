$(() => {
  const movies = [];

  const addMovie = (title, rating) => {
    const movie = {
      title,
      rating
    };

    movies.push(movie);
    displayMovies();
  };

  const displayMovies = () => {
    const moviesList = $("#moviesList");
    moviesList.empty();

    const sortedMovies = sortMovies();

    sortedMovies.forEach((movie, index) => {
      const movieItem = $("<div class='movie'></div>");

      const titleElement = $(`<p class='title'>${movie.title}</p>`);
      const ratingElement = $(`<p>Rating: ${movie.rating}</p>`);
      const removeButton = $("<button class='remove-btn'>Remove</button>").click(() => {
        removeMovie(index);
      });

      movieItem.append(titleElement, ratingElement, removeButton);
      moviesList.append(movieItem);
    });
  };

  const removeMovie = (index) => {
    movies.splice(index, 1);
    displayMovies();
  };

  const sortMovies = () => {
    const sortBy = $("#sortBy").val();
    const sortOrder = $("#sortOrder").val();

    const sortedMovies = [...movies];

    if (sortBy === "title") {
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      sortedMovies.sort((a, b) => a.rating - b.rating);
    }

    if (sortOrder === "desc") {
      sortedMovies.reverse();
    }

    return sortedMovies;
  };

  $("#moviesForm").submit((event) => {
    event.preventDefault();

    const title = $("#titleInput").val();
    const rating = parseFloat($("#ratingInput").val());

    addMovie(title, rating);

    $("#moviesForm")[0].reset();
  });

  const sortSection = $("<div class='sort'></div>");
  const sortBySelect = $("<select id='sortBy'></select>");
  const sortOrderSelect = $("<select id='sortOrder'></select>");

  const options = ["title", "rating"];
  options.forEach((option) => {
    sortBySelect.append($("<option></option>").attr("value", option).text(option));
  });

  const orderOptions = {
    asc: "Ascending",
    desc: "Descending"
  };
  Object.entries(orderOptions).forEach(([value, text]) => {
    sortOrderSelect.append($("<option></option>").attr("value", value).text(text));
  });

  sortSection.append("Sort by: ", sortBySelect, " Sort order: ", sortOrderSelect);
  sortSection.appendTo($("body"));
  sortSection.insertBefore($('#moviesList'));

  $("#sortBy, #sortOrder").change(() => {
    displayMovies();
  });
});
