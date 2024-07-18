let alldata = [];
const bars = document.getElementById("bars");
const mark = document.getElementById("mark");
const navjs = document.querySelector(".nav-js");
const Search = document.getElementById("Search");
const SearchBy = document.getElementById("SearchBy");
const SearchName = document.getElementById("searchName");
const rowData = document.getElementById("rowData");
const Categories = document.getElementById("Categories");
const Area = document.getElementById("Area");
const Ingredients = document.getElementById("Ingredients");
const Contact = document.getElementById("Contact");
const conte = document.querySelector(".conte");
const lidng = document.querySelector(".lidng");
const inbat = document.querySelector('input')
Contact.addEventListener("click", function () {
  navjs.style.cssText = `
    left: -12%;
    `;
  bars.classList.add("d-none");
  mark.classList.remove("d-none");
  SearchBy.classList.add("d-none");
  rowData.classList.add("d-none");
  conte.classList.remove("d-none");
});
bars.addEventListener("click", function () {
  navjs.style.cssText = `
    left: 0;
    `;
  bars.classList.add("d-none");
  mark.classList.remove("d-none");
});
mark.addEventListener("click", function () {
  navjs.style.cssText = `
    left: -12%;
    `;
  mark.classList.add("d-none");
  bars.classList.remove("d-none");
});
Search.addEventListener("click", function () {
  SearchBy.classList.remove("d-none");
  rowData.classList.add("d-none");
  conte.classList.add("d-none");
  navjs.style.cssText = `
    left: -12%;
    `;
  mark.classList.add("d-none");
  bars.classList.remove("d-none");
});
Categories.addEventListener("click", function () {
  rowData.classList.add("d-none");
  SearchBy.classList.add("d-none");
  conte.classList.add("d-none");
  navjs.style.cssText = `
    left: -12%;
    `;
  getcategories();
});
Area.addEventListener("click", function () {
  rowData.classList.add("d-none");
  SearchBy.classList.add("d-none");
  conte.classList.add("d-none");
  navjs.style.cssText = `
    left: -12%;
    `;
  getArea();
});
Ingredients.addEventListener("click", function () {
  rowData.classList.add("d-none");
  SearchBy.classList.add("d-none");
  conte.classList.add("d-none");
  navjs.style.cssText = `
    left: -12%;
    `;
  getIngredients();
});
SearchName.addEventListener('input',function(){
  getSeafood(inbat.value)
  console.log(getSeafood(inbat.value))
})
getSeafood('');
async function getSeafood(mels) {
try {
  lidng.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mels}`
  );
  const resbons = await api.json();
  alldata = resbons.meals;
  displaydaa();
  $(".ineer").on("click", function () {
    const data = getDetails($(this).attr("id")).then((data) => {
      console.log(data);
      displayDetails(data);
    });
  });
} catch (error) {
  console.log("errro")
}finally{
  lidng.classList.add("d-none");  
}
}
async function getDetails(idMeal) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  const resbons = await api.json();
  return resbons;
}
function displaydaa() {
  let ds = "";
  alldata.forEach((element) => {
    ds += `
          <div class="col-3">

               <div class="ineer" id="${element.idMeal}">
                   
                    <div class="hover">
                             <h3>${element.strMeal}</h3>
                    </div>
                    <img src="${element.strMealThumb}" alt="${element.strMeal}" class="img-fluid">
               </div>

            </div>
        `;
  });
  document.getElementById("rowData").innerHTML = ds;
}
function displayDetails(data) {
  const element = data.meals[0];
  let ds = `
          <div class="col-4">

               <div class="ineer">
                   
                     <img src="${element.strMealThumb}" alt="${element.strMeal}" class="img-fluid ">
                      <h3>${element.strArea}</h3>
               </div>

            </div>
          <div class="col-8">

               <div class="ineer">
                   
                    <h2>Instructions</h2>
                    <p> ${element.strInstructions}</p>
                    <p> Area :${element.strArea}</p>
                    <p> Category :${element.strCategory}</p>
                    <p>Recipes :</p>
                    <span>${element.strIngredient1}</span>
                    <span>${element.strIngredient2}</span>
                    <span>${element.strIngredient3}</span>
                    <span>${element.strIngredient4}</span>
                    <span>${element.strIngredient5}</span>
                    <span>${element.strIngredient6}</span>
                    <span>${element.strIngredient7}</span>

               </div>

            </div>
        `;
  $("#rowData").html(ds);
}
async function getcategories() {
  const api =
    await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php
        `);
  const resbons = await api.json();
  alldata = resbons.categories;
  displaydaas();

  $(".ineer").on("click", function () {
    console.log("oiio");
    const data = categoryMeals($(this).attr("id")).then((data) => {
      console.log(data);
      displayDetails(data);
    });
  });
}
async function categoryMeals(categoryName) {
  const api =
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}
        `);
  const resbons = await api.json();
  return resbons;
}

function displaydaas() {
  let ds = "";
  alldata.forEach((element) => {
    ds += `
          <div class="col-3">

               <div class="ineer" id="${element.strCategory}">
                   
                    <div class="hover">
                             <h3>${element.strCategoryThumb}</h3>
                    </div>
                    <img src="${element.strCategoryThumb}" alt="${element.strCategoryDescription}" class="img-fluid ">
               </div>

            </div>
        `;
  });
  $("#rowData").removeClass("d-none");
  document.getElementById("rowData").innerHTML = ds;
}
async function getArea() {
  const api =
    await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list
        `);
  const resbons = await api.json();
  alldata = resbons.meals;
  display(alldata);
  $(".ineers").on("click", function () {
    console.log($(this).children().children("h3").html());
    getSeaCanadian($(this).children().children("h3").html());
  });
}
function display(alldata) {
  let ds = "";
  alldata.forEach((element) => {
    ds += `
          <div class="col-3">
              
                    <div class="ineers">
                    <div class="hover">
                        <i class="fa-solid fa-house-laptop fs-1"></i>
                        <h3>${element.strArea}</h3>
                     </div>
                     </div>
            </div>
        `;
  });
  $("#rowData").removeClass("d-none");
  $("#rowData").html(ds);
}
async function getIngredients() {
  const api =
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
        `);
  const resbons = await api.json();
  alldata = resbons.meals;
  displayd();
}
function displayd() {
  let ds = "";
  alldata.forEach((element) => {
    ds += `
          <div class="col-3">
                   <div class="ineer"> 
                    <div class="hover">
                        <h3>${element.strMeal}</h3>
                        </div>
                    <img src="${element.strMealThumb}" alt="${element.strMeal}" class="img-fluid ">
               </div>
            </div>
        `;
  });
  $("#rowData").removeClass("d-none");
  document.getElementById("rowData").innerHTML = ds;
}
async function getSeaCanadian(areaName) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  const resbons = await api.json();
  alldata = resbons.meals;
  displayCanadian(alldata);
  $(".ineer").on("click", function () {
    console.log("oiio");
    const data = getDetails($(this).attr("id")).then((data) => {
      console.log(data);
      displayDetails(data);
    });
  });
}
function displayCanadian() {
  let ds = "";
  alldata.forEach((element) => {
    ds += `
          <div class="col-3">

               <div class="ineer" id="${element.idMeal}">
                   
                    <div class="hover">
                             <h3>${element.strMeal}</h3>
                    </div>
                    <img src="${element.strMealThumb}" alt="${element.strMeal}" class="img-fluid">
               </div>

            </div>
        `;
  });
  document.getElementById("rowData").innerHTML = ds;
}

