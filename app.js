const API = "20c9bbf3da6b4b50a3ec3ab808860f25"

const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeItemEl = document.createElement("li");
      recipeItemEl.classList.add("recipe-item");
      recipeImageEl = document.createElement("img");
      recipeImageEl.src = recipe.image;
      recipeImageEl.alt = "recipe image";
  
      recipeTitleEl = document.createElement("h2");
      recipeTitleEl.innerText = recipe.title;
  
      recipeIngredientsEl = document.createElement("p");
      recipeIngredientsEl.innerHTML = `
          <strong>Ingredients:</strong> ${recipe.extendedIngredients
            .map((ingredient) => ingredient.original)
            .join(", ")}
      `;
  
      recipeLinkEl = document.createElement("a");
      recipeLinkEl.href = recipe.sourceUrl;
      recipeLinkEl.innerText = "View Recipe";
  
      recipeItemEl.appendChild(recipeImageEl);
      recipeItemEl.appendChild(recipeTitleEl);
      recipeItemEl.appendChild(recipeIngredientsEl);
      recipeItemEl.appendChild(recipeLinkEl);
      recipeListEl.appendChild(recipeItemEl);
    });
  }

  function showLoadingIndicator() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.className = 'loading-animation';
    loadingIndicator.textContent = 'Loading...';
    document.body.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

async function getRecipes() {

    showLoadingIndicator();
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API}`)
    const data = await response.json()
    console.log(data);
    setTimeout(hideLoadingIndicator, 500);
    return data.recipes;

}


async function init(){

    const recipes = await getRecipes()
    displayRecipes(recipes)
}
