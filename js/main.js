const navlinks = document.querySelectorAll(".offcanvas .list-group li");
const closeBtn = document.getElementById("closeBtn");
const barsBtn = document.getElementById("bars");
const mainSection = document.getElementById("main");
const searchList = document.getElementById("searchList");
const categoriesList = document.getElementById("categoriesList");
const mealsList = document.getElementById("mealsList");
const areaList = document.getElementById("areaList");
const ingredientsList = document.getElementById("ingredientsList");
const contactList = document.getElementById("contactList");
const btnSubmit = document.getElementById("btnSubmit");
const repasswordInput = document.getElementById("repassword");
const loader = document.querySelector(".loading");
const mealDetailsList = document.querySelector(".mealDetails");
const sideNav = document.querySelector(".offcanvas");
const mealDetailsRow = document.querySelector("#details");
function prepareDisplay(index) {
  if(!index){
    searchList.innerHTML='';
  }
  window.scrollTo({
  top: 0,
  behavior: "instant"
});
  contactList.classList.replace('d-flex','d-none');
  mealDetailsList.classList.add("d-none");
  mainSection.classList.remove("d-none");
  categoriesList.innerHTML='';
  mealsList.innerHTML='';
  areaList.innerHTML='';
  ingredientsList.innerHTML='';
}
closeBtn.addEventListener("click", () => {
  closeBtn.classList.add("d-none");
  barsBtn.classList.remove("d-none");
  sideNav.classList.remove('show');
  sideNav.classList.add('hiding');
});
barsBtn.addEventListener("click", () => {
  barsBtn.classList.add("d-none");
  closeBtn.classList.remove("d-none");
  sideNav.classList.remove('hiding');
  sideNav.classList.add('show');
});

areaList.addEventListener('click',(e)=>{
  let area = e.target.closest('.inner').id;
  console.log(area);
  getAreaMeals(area);
});
ingredientsList.addEventListener('click',(e)=>{
  let ingredient = e.target.closest('.inner').id;
  console.log(ingredient);
  getIngredientMeals(ingredient);
});
mealsList.addEventListener("click", (e) => {
  closeNav();
  let mealId = e.target.closest(".inner").id;
  getMealDetails(mealId);
});
categoriesList.addEventListener('click',(e)=>{
  let categorey=e.target.closest('.inner').id;
  console.log(categorey);
  getCategoryMeals(categorey);
})
navlinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    closeNav();
    if (this.id == "Categories") getCategories();
    else if (this.id == "Area") getArea();
    else if (this.id == "Ingredients")getIngredients();
    else if (this.id == "Search")search();
    else if (this.id == "Contact")contact();
  });
});

function closeNav() {
    barsBtn.classList.remove("d-none");
    closeBtn.classList.add("d-none");
    sideNav.classList.remove('show');
    sideNav.classList.add('hiding');
}
async function getCategoryMeals(categorey) {
  prepareDisplay();
  loader.classList.remove("trans");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorey}`
  );
  let data = await response.json();
  data = Object.values(data);
  let meals = data[0];
  displayMeals(meals.slice(0,20));
}
async function getCategories() {
  prepareDisplay();
  loader.classList.remove("trans");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  data = Object.values(data);
  let categories = data[0];
  displayCategories(categories);
}
function displayCategories(Category) {
  cartona = "";
  console.log("here");
  for (let i = 0; i < Category.length; i++) {
    cartona += `
        <div class="col-md-3 categorey g-4">
            <div id="${
              Category[i].strCategory
            }" class="inner position-relative rounded-3 overflow-hidden ">
            <div class="desc text-black m-0 p-2 rounded-3">
              <h3> ${Category[i].strCategory}</h3>
              <p class='fs-6 '>${Category[i].strCategoryDescription
                .split(" ", 20)
                .join(" ")}</p>
            </div>
              <img class="rounded-3" src="${
                Category[i].strCategoryThumb
              }" alt="">
            </div>
        </div>`;
  }
  prepareDisplay();
  categoriesList.innerHTML = cartona;
  loader.classList.add("trans");
}

async function getByLetter(name,index) {
  prepareDisplay(index);
  loader.classList.remove("trans");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${name?name : "a"}`
  );
  let data = await response.json();
  data = Object.values(data);
  let meals = data[0];
  displayMeals(meals);
}
async function getMeals(name,index) {
  prepareDisplay(index);
  loader.classList.remove("trans");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name?name : ""}`
  );
  let data = await response.json();
  data = Object.values(data);
  let meals = data[0];
  displayMeals(meals);
}
function displayMeals(meals) {
  cartona = "";
  if(meals){
    for (let i = 0; i < meals.length; i++) {
      cartona += `<div class="col-md-3 meal g-4">
                      <div id="${meals[i].idMeal}" class="inner position-relative rounded-3 overflow-hidden ">
                          <div class="pop-up text-black h3 m-0 p-0" style="--name: '${meals[i].strMeal}';">
                          </div>
                          <img class="rounded-3" src="${meals[i].strMealThumb}" alt="">
                      </div>
                  </div>`;
    }

    mealsList.innerHTML = cartona;
  }else{
    mealsList.innerHTML = '';
  }
  setTimeout(() => {
    loader.classList.add("trans");
    sideNav.classList.remove("entry");
  }, 500);
}

async function getAreaMeals(area) {
  prepareDisplay();
  loader.classList.remove("trans");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  data = Object.values(data);
  let meals = data[0];
  displayMeals(meals.slice(0,20));
}
async function getArea() {
  prepareDisplay();
    loader.classList.remove("trans");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();
  data = Object.values(data);
  let areas = data[0];
  displayAreas(areas);
}
function displayAreas(areas) {
  cartona = "";
  console.log("here");
  for (let i = 0; i < areas.length; i++) {
    cartona += `
        <div class="col-md-3 categorey g-4">
            <div id="${areas[i].strArea}" class="inner">
              <i class="fa-solid fa-house-laptop" style="width:100%"></i>
              <h2 class="text-white text-center">${areas[i].strArea}</h2>
            </div>
        </div>`;
  }
  areaList.innerHTML = cartona;
  loader.classList.add("trans");
}

async function getIngredients() {
  prepareDisplay();
  loader.classList.remove("trans");
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let data = await response.json();
  data = Object.values(data);
  let ingredients = data[0];
  displayIngredients(ingredients.slice(0,20));
}
function displayIngredients(ingredients) {
  prepareDisplay();
  cartona = "";
  for (let i = 0; i < ingredients.length; i++) {
    cartona += `
        <div class="col-md-3 categorey g-4">
            <div id="${ingredients[i].strIngredient}" class="inner text-center text-white ">
              <i class="fa-solid fa-drumstick-bite"></i>
              <h3>${ingredients[i].strIngredient}</h3>
              <p>${ingredients[i].strDescription.split(' ',20).join(' ')}</p>
            </div>
        </div>`;
  }
  ingredientsList.innerHTML = cartona;
  loader.classList.add("trans");
}
async function getIngredientMeals(ingredient) {
  prepareDisplay();
  loader.classList.remove("trans");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  data = Object.values(data);
  let meals = data[0];
  displayMeals(meals.slice(0,20));
}

async function getMealDetails(mealId) {
  loader.classList.remove("trans");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let data = await response.json();
  data = Object.values(data);
  let mealDetails = data[0][0];
  console.log(mealDetails);
  let recipes = "";
  for (let i = 1; i <= 20; i++) {
    let key1 = `strMeasure${i}`;
    let key2 = `strIngredient${i}`;
    if (mealDetails[key1] && mealDetails[key2]) {
      recipes += `
            <p class="badge fs-6 fw-normal py-2 px-1 ms-2">${mealDetails[key1]} ${mealDetails[key2]}</p>
            `;
    }
  }

  let cartona = `
          <div class="col-md-4">
          <div class="rounded-2 overflow-hidden">
          <img
            src="${mealDetails.strMealThumb}"
            style="width: 100%"
            alt=""
          />
          </div>
            <h2 class="mb-4">${mealDetails.strMeal}</h2>
          </div>

          <div class="col-md-8">
            <h2>Instructions</h2>
            <p class="fs-6">
                ${mealDetails.strInstructions}
            </p>
            <h3 class="mb-2">
             <span class="fw-bolder"> Area : </span>
             ${mealDetails.strArea}
            </h3>
            <h3 class="mb-2">
              <span class="fw-bolder">Category : </span>
              ${mealDetails.strCategory}
            </h3>
            <h3 class="mb-2">
              <p id="mealRecipes" class="fw-bolder">Recipes : </p>
              ${recipes}
            </h3>
            <h3 class="mb-2">
              <span id="mealTags" class="fw-bolder">Tags : </span>
            </h3>
            <a
              id="mealUrl"
              href="${mealDetails.strSource}"
              type="button"
              class="btn btn-success text-white mt-3"
              target="_blank"
              >Source</a>
            <a
              id="mealUrl"
              href="${mealDetails.strYoutube}"
              type="button"
              class="btn btn-danger text-white mt-3"
              target="_blank"
              >Youtube</a>
          </div>
        
    `;
  mealDetailsRow.innerHTML = cartona;
  loader.classList.add("trans");
  prepareDisplay();
  mealDetailsList.classList.remove("d-none");
}

function search() {
  prepareDisplay();
  searchList.innerHTML=`
                  <div class="d-flex gap-4 col-md-6">
                    <input class="form-control bg-transparent text-white" oninput="searchName(this)" type="text" placeholder="Search by Name">
                    </div>
                  <div class="d-flex gap-4 col-md-6">
                    <input class="form-control bg-transparent text-white" maxlength="1" oninput="searchLetter(this)" type="text" placeholder="Search by First letter">
                    </div>
                `
}
function searchName(e){
  getMeals(e.value,1);
}
function searchLetter(e){
  getByLetter(e.value,1);
}

var name_isvalid=false;
var email_isvalid=false;
var age_isvalid=false;
var phone_isvalid=false;
var password_isvalid=false;
var repassword_isvalid=false;
contactList.addEventListener('input',(e)=>{
  if(e.target.id!='repassword'){
    validation(e.target);
  }else{
    repasswordValidation(e.target);
  }
});

    function btnCheck() {
      if(name_isvalid && email_isvalid && age_isvalid && phone_isvalid && password_isvalid && repassword_isvalid){
        console.log('here2');
        btnSubmit.removeAttribute('disabled');
      }else{
        console.log('here3');
        btnSubmit.setAttribute('disabled','');
      }
    }

function contact() {
  prepareDisplay();
  contactList.classList.replace('d-none','d-flex');
}
function validation(input) {
  const regex={
    name:/^[a-zA-Z ]+$/,
    email:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    age:/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    password:/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
  }
  if(regex[input.id].test(input.value)){

    input.nextElementSibling.classList.add('d-none')
    console.log('true');
    if(input.id=='name')name_isvalid=true;
    else if(input.id=='email')email_isvalid=true;
    else if(input.id=='phone')phone_isvalid=true;
    else if(input.id=='age')age_isvalid=true;
    else if(input.id=='password')
      {
        password_isvalid=true;
        console.log("here1");
        if(repasswordInput.value)repasswordValidation(repasswordInput);
      }
    btnCheck();
    return true;
  }else{

    input.nextElementSibling.classList.remove('d-none')
    console.log("false");
    if(input.id=='name')name_isvalid=false;
    else if(input.id=='email')email_isvalid=false;
    else if(input.id=='phone')phone_isvalid=false;
    else if(input.id=='age')age_isvalid=false;
    else if(input.id=='password')password_isvalid=false;
    return false;
  }
}
function repasswordValidation(repassword) {
  if(repassword.value == document.getElementById("password").value){
    console.log('here2');
      repassword_isvalid=true;
      repassword.nextElementSibling.classList.add('d-none')
      btnCheck();
      return true;
    }else{
      console.log('here3');
      repassword.nextElementSibling.classList.remove('d-none')
      repassword_isvalid=false;
      return false;
    }
}
getMeals();

