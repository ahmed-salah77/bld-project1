let lastSelectedId = 'python-btn';
let leftCourse =1,rightCourse=5,num_courses=1;
let categoryTitle=[];
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
  let courses = document.querySelector('.courses');
  courses.innerHTML=`<span><button class="prev-btn fa-solid fa-circle-chevron-left fa-2xl border-0" onclick="goBack()"></button></span>`;
  let coursesData=undefined;
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
    addCourses(coursesData);
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
  let courses = document.querySelector('.courses');
  let course_li = document.createElement('li');
  course_li.classList.add('course-li');
  course_li.classList.add('li-'+num_courses);
  course_li.classList.add("carousel-inner");
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
  if(num_courses>5){
    course_li.classList.add('d-none');
  }
  courses.appendChild(course_li);
  num_courses++;
}

function addCourses(coursesData){
  coursesData.forEach(course => {
      addCourse(course);
  });
  let courses = document.querySelector('.courses');
  let nextBtn = document.createElement('span');
  nextBtn.innerHTML = `<button class="next-btn fa-solid fa-circle-chevron-right fa-2xl border-0" onclick="goNext()"></button>`
  courses.append(nextBtn);
  rightCourse=Math.min(5,num_courses);
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


function goNext(){
  if(rightCourse+1>num_courses || num_courses<5)
    return;
  let nextCourse = document.querySelector('.li-'+(rightCourse+1));
  nextCourse.classList.remove('d-none');
  let hiddenCourse = document.querySelector('.li-'+leftCourse);
  hiddenCourse.classList.add('d-none');
  rightCourse++;
  leftCourse++;
}
function goBack(){
  if(leftCourse-1==0 || num_courses<5)
    return;
  let prevCourse = document.querySelector('.li-'+(leftCourse-1));
  prevCourse.classList.remove('d-none');
  let hiddenCourse = document.querySelector('.li-'+rightCourse);
  hiddenCourse.classList.add('d-none');
  rightCourse--;
  leftCourse--;
}

