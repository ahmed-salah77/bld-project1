let lastSelectedId = 'python-btn';
let num_courses=0;
let block_num = 0;
let categoryTitle=[];
let coursesData=[];
let numOfCourses = 5;
categoryTitle['python-btn']="Expand your career opportunities with Python";
categoryTitle['web-btn']="Build websites and applications with Web Development";
categoryTitle['excel-btn']="Analyze and visualize data with Excel";
categoryTitle['javascript-btn']="Grow your software development skills with JavaScript";
categoryTitle['data-btn']="Lead data-driven decisions with Data Science";
categoryTitle['AWS-btn']="Become an expert in cloud computing with AWS Certification";
categoryTitle['drawing-btn']="Expand your creative skillset with Drawing";
let categoryDisc=[];
categoryDisc['python-btn']="Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to both beginners and advanced developers alike.";
categoryDisc['web-btn']="The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.";
categoryDisc['excel-btn']="Take a Microsoft Excel course from Udemy, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to turn their raw data into actionable insights.";
categoryDisc['javascript-btn']="The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.";
categoryDisc['data-btn']="The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.";
categoryDisc['AWS-btn']="The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.";
categoryDisc['drawing-btn']="Want to start drawing for fun or take your craft to the next level? Explore our online drawing classes and learn pencil drawing, figure drawing, cartoon drawing, character drawing for cartoons and anime, illustration, sketching, shading and more. Take an overview course on the fundamentals of drawing or zero in on an area you’d like to improve with a specialized course. We’ve got tons of options to get — and keep — you going.";
let categoryBtn=[];
categoryBtn['python-btn']="Explore Python";
categoryBtn['web-btn']="Explore Web Development";
categoryBtn['excel-btn']="Explore Excel";
categoryBtn['javascript-btn']="Explore JavaScript";
categoryBtn['data-btn']="Explore Data Science";
categoryBtn['AWS-btn']="Explore AWS Certification";
categoryBtn['drawing-btn']="Explore Drawing";
window.addEventListener("load" , () =>{
  get("python",lastSelectedId);
  
});
function get(category,id){
  change_info(id);
  leftCourse =1,rightCourse=5,num_courses=1;
  let current = document.getElementById(id);
  let last = document.getElementById(lastSelectedId);
  last.classList.remove('selected');
  current.classList.add('selected');
  lastSelectedId = id;
  let uri = 'https://www.udemy.com/api-2.0/courses/?search='+category+'&fields[course]=@all&page_size=15';
  let h= new Headers();
  h.append("Accept","application/json, text/plain, */*");
  h.append("Authorization","Basic WnR6QXBCZHpaNjE4V3RRc2ZsTzltMTAwa0kxZkxYU3VSN3NFNTB5azpvakRXYjZrOGdPNGZJdGZrTGR0ZTNKM0dZVEI2TTNNcFprN2tTbzgyT016d3QwMnVQbHd0OXVCb0hwd0NWS2RBRG4zRWFQeXl2YlVaOW1EcmxRaGh1dE5XcEF2WkZuYXgzd3I0R3NDVGo3c0hERmtTVUtITDhEWksxS2tZRUNPTw==");
  h.append("Content-Type", "application/json;charset=utf-8");
  let req = new Request(uri,{
    method:'GET',
    headers:h,
  });
  fetch(req) 
  .then(Response => Response.json())
  .then(courses => {
    coursesData = courses.results;
   // console.log(coursesData);
    addCourses();
  });
 
}
function change_info(id){
  let div = document.querySelector('.category-header');
  div.innerHTML = '';
    div.innerHTML =
     `
    <div class="title-type">${categoryTitle[id]}</div>
      <div class="info">
        <p>
        ${categoryDisc[id]}
        </p>
      </div>
    <a href="#" class="explore"><span>${categoryBtn[id]}</span></a>
    `
}
function addCourse(course){
  if(num_courses%numOfCourses == 1 || numOfCourses == 1){
    block_num++;
    let cont = document.querySelector('.carousel-inner');
    let nw_item = document.createElement('div');
    nw_item.classList.add('carousel-item');
    if(block_num==1){
      nw_item.classList.add('active');
    }
    let inside = document.createElement('div');
    inside.classList.add('d-flex');
    inside.classList.add('blk-'+block_num);
    nw_item.appendChild(inside);
    cont.appendChild(nw_item);
  }
  let courses = document.querySelector('.blk-'+block_num);
  console.log(numOfCourses);
  let course_li = document.createElement('div');
  course_li.classList.add('course-li');
  course_li.classList.add('li-'+num_courses);
  let stars=``;
  let full = `<span class='fa fa-star' style = 'color:#E59819'></span>`;
  let half = `<span class='fa fa-star-half-o' style = 'color:#E59819'></span>`;
  let empty = `<span class='fa fa-star-o' style = 'color:#E59819'></span>`;
  var cnt = Math.floor(course.avg_rating);
  for(var i = 0;i<cnt;++i){
    stars+=full;
  }
  if(course.avg_rating != cnt){
    stars+=half;
    cnt++;
  }
  for(var i = cnt;i<5;++i){
    stars+=empty;
  }
  let html;
  html=`
  <a href=${course.url}>
    <figure>
      <img class = "course-img" src=${course.image_480x270} alt="python photo">
      <figcaption class = "course-title">
        ${course.title}
      </figcaption>
      <figcaption class='creator'>
        ${course.visible_instructors[0].title}
      </figcaption>
      <figcaption class='rate cnt'>
          <span class='rate'> ${course.avg_rating.toFixed(1)}</span>
          ${stars}
          <span class='cnt'> (${course.num_reviews.toLocaleString('en', {useGrouping:true})
        })</span>
      </figcaption>
      <figcaption class='price'>
         ${course.price}
      </figcaption>
    </figure> 
  </a>`;
  course_li.innerHTML = html;
  courses.appendChild(course_li);
}
function clear(className){
  num_courses = 0;
  block_num = 0;
  let x = document.querySelector(className);
  x.innerHTML=``;
}
function addCourses(){
  clear(".carousel-inner");
  coursesData.forEach(course => {
      num_courses++;
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
function changeNumOfCoursesh(x) {
  if(x.matches){
    numOfCourses = 5;
    addCourses();
  }
}
function changeNumOfCoursesx(x) {
  if(x.matches){
    numOfCourses = 4;
    addCourses();
  }
}
function changeNumOfCoursesy(x) {
  if(x.matches){
    numOfCourses = 3;
    addCourses();
  }
}
function changeNumOfCoursesw(x) {
  if(x.matches){
    numOfCourses = 2;
    addCourses();
  }
}
function changeNumOfCoursesz(x) {
  if(x.matches){
    numOfCourses = 1;
    addCourses();
  }
}
const h = window.matchMedia("(min-width:1401px)");
const x = window.matchMedia("(min-width:1151px) and (max-width: 1400px)");
const y = window.matchMedia("(min-width:901px) and (max-width: 1150px)");
const w = window.matchMedia("(min-width:701px) and (max-width: 900px)");
const z = window.matchMedia("(max-width: 700px)");
changeNumOfCoursesx(x); // Call listener function at run time
changeNumOfCoursesh(h); // Call listener function at run time
changeNumOfCoursesy(y); // Call listener function at run time
changeNumOfCoursesw(w); // Call listener function at run time
changeNumOfCoursesz(z); // Call listener function at run time

x.addListener(changeNumOfCoursesx); // Attach listener function on state changes
y.addListener(changeNumOfCoursesy); // Attach listener function on state changes
w.addListener(changeNumOfCoursesw); // Attach listener function on state changes
z.addListener(changeNumOfCoursesz); // Attach listener function on state changes
h.addListener(changeNumOfCoursesh); // Attach listener function on state changes

