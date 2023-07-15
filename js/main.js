const serachBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const mealDetails = document.querySelector('.meal-details');
const recipeClosBtn = document.getElementById('recipe-close-btn');

// event listener
serachBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeClosBtn.addEventListener('click', closeMealDetails);

// get meal list matchs with the ingredients

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(response => response.json()).then(data => {
        let html = '';
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id = "${meal.idMeal
                }">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>`
            });
            mealList.classList.remove('notFound')
        } else {
            html = "Sorry, We Didn't Finde Any Meal!";
            mealList.classList.add('notFound')
        }
        mealList.innerHTML = html;
    })
}

// get recipes of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response => response.json()).then(data => 
            mealRecipeModal(data.meals))
    }
}

// creat a modal 
function mealRecipeModal(meal) {
    meal = meal[0];
    console.log(meal.strCategory);
    let html = `
            <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
            </div>
            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="recipe-link">
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>`;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
   
}

// close meal details 
function closeMealDetails() {
    mealDetails.classList.remove('showRecipe');
}

// chang mood 
const moodCollection = document.querySelectorAll('.change-color form label')
console.log(moodCollection)
const moodBall = Array.from(moodCollection);
console.log(moodBall)
moodBall.forEach(ball => {
    ball.addEventListener('click', function() {
        localStorage.setItem('mood', ball.dataset.color);
        changeMood();
    })
})

const theH2 = document.querySelector('.meal-search');
const searchControl = document.querySelector('.search-control');
const mealResultH2 = document.querySelector('.meal-results h2');

function changeMood() {
    if (localStorage.mood === 'dark') {
        document.body.style.background = '#444';
        theH2.classList.add('dark-text');
        theH2.classList.remove('blue-text');
        searchControl.classList.remove('light')
        searchControl.classList.add('dark');
        serachBtn.classList.add('dark')
        serachBtn.classList.remove('light')
        mealResultH2.classList.add('dark-text');
        mealResultH2.classList.remove('blue-text');
        if (mealList.innerHTML !== '') {
            const mealItems = document.querySelectorAll('.meal-item');
            const mealName = document.querySelectorAll('.meal-name h3');
            const recipeBtn = document.querySelectorAll('.recipe-btn');
            const recipeBtnArr = Array.from(recipeBtn);
            recipeBtnArr.forEach(reicpe => {
                reicpe.classList.remove('blue');
            })
            const mealh3Arr = Array.from(mealName);
            mealh3Arr.forEach(title => {
                title.classList.add('dark');
                title.classList.remove('blue');
            })
            const mealArr = Array.from(mealItems);
            mealArr.forEach(item => {
                item.classList.add('dark');
                item.classList.remove('blue');
            })
        }
    } else if (localStorage.mood === 'light') {
        document.body.style.background = '#dbdef7'
        theH2.classList.remove('dark-text');
        theH2.classList.add('blue-text');
        searchControl.classList.remove('dark');
        searchControl.classList.add('light')
        serachBtn.classList.remove('dark');
        serachBtn.classList.add('light');
        mealResultH2.classList.add('blue-text');
        if (mealList.innerHTML !== '') {
            const mealItems = document.querySelectorAll('.meal-item');
            const mealName = document.querySelectorAll('.meal-name h3');
            const recipeBtn = document.querySelectorAll('.recipe-btn');
            const recipeBtnArr = Array.from(recipeBtn);
            recipeBtnArr.forEach(reicpe => {
                reicpe.classList.add('blue');
            })
            const mealh3Arr = Array.from(mealName);
            mealh3Arr.forEach(title => {
                title.classList.remove('dark');
                title.classList.add('blue');
            })
            const mealArr = Array.from(mealItems);
            mealArr.forEach(item => {
                item.classList.remove('dark');
                item.classList.add('blue');
            })
        }
    } else {
        document.body.style.background = '#f1bfa2';
        theH2.classList.remove('dark-text');
        theH2.classList.remove('blue-text');
        searchControl.classList.remove('dark');
        searchControl.classList.remove('light');
        serachBtn.classList.remove('dark');
        serachBtn.classList.remove('light');
        mealResultH2.classList.remove('dark-text');
        mealResultH2.classList.remove('blue-text');
        if (mealList.innerHTML !== '') {
            const mealItems = document.querySelectorAll('.meal-item');
            const mealName = document.querySelectorAll('.meal-name h3');
            const recipeBtn = document.querySelectorAll('.recipe-btn');
            const recipeBtnArr = Array.from(recipeBtn);
            recipeBtnArr.forEach(reicpe => {
                reicpe.classList.remove('dark');
                reicpe.classList.remove('blue');
            })
            const mealh3Arr = Array.from(mealName);
            mealh3Arr.forEach(title => {
                title.classList.remove('dark');
                title.classList.remove('blue')
            })
            const mealArr = Array.from(mealItems);
            mealArr.forEach(item => {
                item.classList.remove('dark')
                item.classList.remove('blue')

            })
        }
    }
}
changeMood()

