const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealEl = document.getElementById("meals");
const resultHeading = document.getElementsByClassName("result-heading");
const single_mealEl = document.getElementById("single-meal");

//Search Meal
function searchMeal(e) {
  e.preventDefault();

  //get search meal
  const term = search.value;

  //check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `
            <h2>Search Result for ${term}</h2>`;
        if (resultHeading === null) {
          resultHeading.innerHTML = `<h2>There are No Result for ${term}</h2>`;
        } else {
          mealEl.innerHTML = data.meals
            .map(
              (meal) => `
                    <div onclick= "displayRecipe('${meal.idMeal}')" class="card meal" style="width: 18rem;">
                    <img src = "${meal.strMealThumb}" class="card-img-top" alt = "${meal.strMeal}"
                    <div class="card-body">
                    <h5 class="card-text">${meal.strMeal}</h5>
                    
                    </div>
                    </div>`
            )
            .join("");
        }
      });
  } else {
    alert("Please insert a value for Search Food Recipe");
  }
}

//event listeners
submit.addEventListener("submit", searchMeal);


const displayRecipe = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    // .then(data => console.log(data))
    .then((data) => recipeInfo(data.meals[0]));
};

const recipeInfo = (meal) => {
  const recipeDiv = document.getElementById("recipe-detail");
  recipeDiv.innerHTML = `
    <div class="text-center">
    <img src = "${meal.strMealThumb}" class="card-img-top" alt = "${meal.strMeal}"
    <br>
    <p><h4> ${meal.strMeal}</h4></p>
    <p><h5><b> Recipe Ingredients Are: </b></h5></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient1}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient2}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient3}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient4}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient5}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient6}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient7}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient8}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient9}</i></p>
    <p><i class="fas fa-check-square"> ${meal.strIngredient10}</i></p>
    </div>
    `;
};
