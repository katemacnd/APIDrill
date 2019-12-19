// jshint esversion: 6

const searchURL = 'https://api.github.com/users/:username/repos';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems;
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  $('#results-list').append(
    `<h3>Username: ${responseJson[0].owner.login}</h3>
    <section>Repos:`);
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li>
      <a href = '${responseJson[i].html_url}''>
      ${responseJson[i].name}</a>
      </li>`
    );}
  $('#results').removeClass('hidden');
}

function getRepos(USERNAME) {
  const params = {
    user: USERNAME,
  };
  const queryString = formatQueryParams(params);
  const url = `https://api.github.com/users/${USERNAME}/repos`;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);
