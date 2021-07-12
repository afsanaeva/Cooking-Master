const search = document.getElementById('search');
const submit = document.getElementById('submit');
const mealEl = document.getElementById('meals');
const resultHeading = document.getElementsByClassName('result-heading');
const single_mealEl = document.getElementById('single-meal');

//Search Meal
function searchMeal(e){
    e.preventDefault();

    //clear single meal
    single_mealEl.innerHTML = "";

    //get search meal
    const term = search.value;

    //check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            resultHeading.innerHTML = `
            <h2>Search Result for ${term}</h2>`;
            if(resultHeading === null){
                resultHeading.innerHTML = `<h2>There are No Result for ${term}</h2>`;
            }
            else{
                mealEl.innerHTML = data.meals.map(
                    meal => `
                    <div class="card meal" style="width: 18rem;">
                    <img src = "${meal.strMealThumb}" class="card-img-top" alt = "${meal.strMeal}"
                    <div class="card-body">
                    <h5 class="card-text">${meal.strMeal}</h5>
                    </div>
                    </div>`
                )
                .join("");
            }
        });
    }else{
        alert("Please insert a value for Search Food Recipe")
    }


}

//event listeners

submit.addEventListener('submit',searchMeal)
mealEl.addEventListener('click',function(){

})
