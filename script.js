
window.addEventListener("load" , () =>{
  let coursesData=undefined;
  fetch("db.json")
    .then(Response => Response.json())
    .then(courses => {
      coursesData = courses;
      addCourses(coursesData);
    });
});


function addCourse(course){
  let courses = document.querySelector('.courses');
  let course_li = document.createElement('li');
  course_li.classList.add('course-li');
  course_li.classList.add('li-'+course.id);
  course_li.classList.add("carousel-inner");

  let html;
  html=`
  <a href=${course.link}>
    <figure>
      <img class = "course-img" src=${course.image} alt="python photo">
      <figcaption class = "course-title">
        ${course.title}
      </figcaption>
      <figcaption class='creator'>
        ${course.author}
      </figcaption>
      <figcaption class='rate cnt'>
          <span class='rate'> ${course.rating}</span>
          <span class='cnt'> (${course.people})</span>
      </figcaption>
      <figcaption class='price'>
         E£${course.price}
      </figcaption>
    </figure> 
  </a>`;
  course_li.innerHTML = html;
  courses.appendChild(course_li);
}

function addCourses(coursesData){
  console.log(coursesData);
  coursesData.forEach(course => {
      addCourse(course);
  });
}
function search(){
  var input, filter, ul, li, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.querySelector(".courses");
  li = ul.querySelectorAll('.course-li');
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].querySelector(".course-title");
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


