let coursesData;

function fetchCourses() {
  let parent = document.querySelector(".courses-flex-box");
  fetch("https://ahmedsaif2.github.io/Udemy-Clone/db.json")
    .then((Response) => Response.json())
    .then((items) => {
      console.log(items.courses);
      coursesData = items.courses;
      coursesData.forEach((item) => {
        parent.append(addCourse(item));
      });
    });
}

function addCourse(item) {
  let course = document.createElement("div");
  course.classList.add("course");
  course.classList.add("id-" + item.id);
  course.innerHTML = `
    <img src="${item.course_img}" alt="${item.category} Course" />
    <h2>${item.title}</h2>
    <span>${item.author}</span>
    <br />
    <span class="rating">${item.rating}</span>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-regular fa-star"></i>
    <span>(${item.ratings_count})</span>
    <h2>${item.price}</h2>
    `;
  return course;
}