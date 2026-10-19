
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const imageFallback = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80";

const initialCourses = [
  {id:1,title:"Complete Web Development",category:"Technology",price:1499,students:324,rating:4.9,lessons:48,image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",description:"Build responsive websites and learn HTML, CSS, JavaScript and practical development workflows."},
  {id:2,title:"Business & Entrepreneurship",category:"Business",price:999,students:286,rating:4.8,lessons:32,image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",description:"Understand business fundamentals, planning, strategy and how to build sustainable ventures."},
  {id:3,title:"UI/UX Design Masterclass",category:"Design",price:1299,students:218,rating:4.9,lessons:36,image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=700&q=80",description:"Learn user research, wireframes, design systems and polished digital interface design."},
  {id:4,title:"Digital Marketing Pro",category:"Marketing",price:899,students:412,rating:4.8,lessons:40,image:"https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=700&q=80",description:"Explore SEO, content strategy, campaign planning, analytics and online brand growth."},
  {id:5,title:"Data Analytics Essentials",category:"Technology",price:1599,students:176,rating:4.7,lessons:44,image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",description:"Build a foundation in data analysis, visualization, reporting and data-driven decisions."},
  {id:6,title:"Personal Finance & Investing",category:"Business",price:799,students:305,rating:4.8,lessons:28,image:"https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=700&q=80",description:"Understand budgeting, financial planning and investing fundamentals for informed decisions."}
];

let courses = initialCourses.map(c => ({...c}));
let activeCategory = "All";
let showAll = false;
let nextId = 7;
let authMode = "login";
let currentCurrency = "₹";
let toastTimer;

const students = [
  {name:"Aarav Sharma",email:"aarav@example.com",courses:3,date:"Oct 18, 2026",status:"Active"},
  {name:"Ananya Verma",email:"ananya@example.com",courses:2,date:"Oct 17, 2026",status:"Active"},
  {name:"Rohan Patel",email:"rohan@example.com",courses:1,date:"Oct 16, 2026",status:"Active"},
  {name:"Priya Singh",email:"priya@example.com",courses:4,date:"Oct 15, 2026",status:"Active"},
  {name:"Kabir Mehta",email:"kabir@example.com",courses:2,date:"Oct 13, 2026",status:"Active"},
  {name:"Ishita Gupta",email:"ishita@example.com",courses:1,date:"Oct 12, 2026",status:"Active"}
];

const orders = [
  {id:"SK-1048",name:"Aarav Sharma",email:"aarav@example.com",course:"Complete Web Development",date:"Oct 19, 2026",amount:1499,status:"Paid"},
  {id:"SK-1047",name:"Ananya Verma",email:"ananya@example.com",course:"UI/UX Design Masterclass",date:"Oct 19, 2026",amount:1299,status:"Paid"},
  {id:"SK-1046",name:"Rohan Patel",email:"rohan@example.com",course:"Digital Marketing Pro",date:"Oct 18, 2026",amount:899,status:"Paid"},
  {id:"SK-1045",name:"Priya Singh",email:"priya@example.com",course:"Business & Entrepreneurship",date:"Oct 18, 2026",amount:999,status:"Pending"},
  {id:"SK-1044",name:"Kabir Mehta",email:"kabir@example.com",course:"Data Analytics Essentials",date:"Oct 17, 2026",amount:1599,status:"Paid"},
  {id:"SK-1043",name:"Ishita Gupta",email:"ishita@example.com",course:"Personal Finance & Investing",date:"Oct 16, 2026",amount:799,status:"Paid"}
];

const money = n => currentCurrency + Number(n).toLocaleString("en-IN");
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[ch]));

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

function safeImage(url) {
  try {
    const parsed = new URL(url, location.href);
    if (["https:","http:"].includes(parsed.protocol)) return parsed.href;
  } catch {}
  return imageFallback;
}

function imageHTML(url, title, className = "") {
  return `<img class="${className}" src="${escapeHTML(safeImage(url))}" alt="${escapeHTML(title)}" loading="lazy" onerror="this.onerror=null;this.src='${imageFallback}'">`;
}

function renderPublicCourses() {
  const query = ($("#courseSearch")?.value || "").trim().toLowerCase();
  const filtered = courses.filter(c =>
    (activeCategory === "All" || c.category === activeCategory) &&
    `${c.title} ${c.category} ${c.description}`.toLowerCase().includes(query)
  );
  const visible = showAll ? filtered : filtered.slice(0, 6);
  const grid = $("#courseGrid");

  grid.innerHTML = visible.length ? visible.map(c => `
    <article class="course-card">
      <div class="course-cover">
        ${imageHTML(c.image,c.title)}
        <span class="course-tag">${escapeHTML(c.category)}</span>
      </div>
      <div class="course-body">
        <div class="course-meta"><span>${c.lessons} lessons</span><span class="rating">★ ${c.rating}</span></div>
        <h3>${escapeHTML(c.title)}</h3>
        <p>${escapeHTML(c.description)}</p>
        <div class="course-bottom">
          <div class="price">${money(c.price)} <small>/ course</small></div>
          <button class="course-action" data-view-course="${c.id}">View details ↗</button>
        </div>
      </div>
    </article>`).join("") :
    `<div class="empty-state">No courses found. Try another search.</div>`;

  $("#showAllCourses").classList.toggle("hidden", filtered.length <= 6);
  $("#showAllCourses").textContent = showAll ? "Show fewer courses ↑" : "Explore all courses ↗";
}

function renderAdminCourses() {
  const query = ($("#adminCourseSearch")?.value || "").toLowerCase().trim();
  const category = $("#adminCourseCategory")?.value || "All";
  const filtered = courses.filter(c =>
    (category === "All" || c.category === category) &&
    `${c.title} ${c.category}`.toLowerCase().includes(query)
  );

  $("#courseCount").textContent = courses.length;
  $("#adminCourseList").innerHTML = filtered.length ? filtered.map(c => `
    <article class="admin-course-card">
      ${imageHTML(c.image,c.title)}
      <div class="admin-course-info">
        <div class="course-meta"><span>${escapeHTML(c.category)}</span><span class="rating">★ ${c.rating}</span></div>
        <h3>${escapeHTML(c.title)}</h3>
        <p>${escapeHTML(c.description)}</p>
        <div class="course-meta"><span>${c.lessons} lessons</span><span>${c.students} learners</span></div>
        <div class="admin-course-footer">
          <strong>${money(c.price)}</strong>
          <div class="course-admin-actions">
            <button class="small-action" data-edit-course="${c.id}">Edit</button>
            <button class="small-action delete" data-delete-course="${c.id}">Delete</button>
          </div>
        </div>
      </div>
    </article>`).join("") :
    `<div class="empty-state">No matching courses. Try a different filter.</div>`;
}

function renderTopCourses() {
  const popular = [...courses].sort((a,b) => b.students-a.students).slice(0,4);
  $("#topCourses").innerHTML = popular.map(c => `
    <div class="top-course-row">
      ${imageHTML(c.image,c.title,"top-course-img")}
      <div class="top-course-info"><b>${escapeHTML(c.title)}</b><small>${c.students.toLocaleString("en-IN")} enrollments</small></div>
      <div class="top-course-amount">${money(c.price)}</div>
    </div>`).join("");
}

function renderChart() {
  const period = $("#revenuePeriod").value;
  const labels = period === "week"
    ? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    : ["Apr","May","Jun","Jul","Aug","Sep","Oct"];
  const current = period === "week"
    ? [18,29,24,45,38,67,54]
    : [27,40,35,61,48,73,63];
  const previous = period === "week"
    ? [12,21,17,31,29,42,38]
    : [18,29,27,45,36,53,48];

  $("#revenueChart").innerHTML = labels.map((label,i) => `
    <div class="bar-group">
      <div class="bar-pair">
        <div class="bar secondary" style="height:${previous[i]}%"></div>
        <div class="bar" style="height:${current[i]}%"></div>
      </div>
      <span class="bar-label">${label}</span>
    </div>`).join("");
}

function studentRows(query = "") {
  return students.filter(s =>
    `${s.name} ${s.email}`.toLowerCase().includes(query.toLowerCase())
  ).map(s => `
    <tr>
      <td><div class="student-cell"><span class="student-initial">${escapeHTML(s.name.split(" ").map(x=>x[0]).join(""))}</span><strong>${escapeHTML(s.name)}</strong></div></td>
      <td>${escapeHTML(s.email)}</td><td>${s.courses} courses</td>
      <td>${escapeHTML(s.date)}</td><td><span class="status active">${s.status}</span></td>
    </tr>`).join("");
}

function orderRows(list, includeId = false) {
  return list.map(o => `
    <tr>
      ${includeId ? `<td><strong>${escapeHTML(o.id)}</strong></td>` : ""}
      <td><div class="student-cell"><span class="student-initial">${escapeHTML(o.name.split(" ").map(x=>x[0]).join(""))}</span><strong>${escapeHTML(o.name)}</strong></div></td>
      <td>${escapeHTML(o.course)}</td>
      <td>${escapeHTML(o.date)}</td>
      <td><strong>${money(o.amount)}</strong></td>
      <td><span class="status ${o.status.toLowerCase()}">${o.status}</span></td>
    </tr>`).join("");
}

function renderTables() {
  $("#recentOrders").innerHTML = orderRows(orders.slice(0,5));
  $("#ordersTable").innerHTML = orderRows(orders,true);
  $("#studentsTable").innerHTML = studentRows($("#studentSearch")?.value || "");

  const paid = orders.filter(o => o.status === "Paid");
  $("#ordersRevenue").textContent = money(paid.reduce((sum,o)=>sum+o.amount,0));
  $("#successfulOrders").textContent = paid.length;
  $("#studentMetric").textContent = "1,284";
}

function renderDashboard() {
  renderTopCourses();
  renderChart();
  renderTables();
}

const pageNames = {
  dashboard:"Overview",
  coursesAdmin:"Courses",
  students:"Students",
  orders:"Orders & Sales",
  library:"Media Library",
  settings:"Settings"
};

function showPage(page) {
  if (!pageNames[page]) page = "dashboard";
  $("#publicSite").classList.add("hidden");
  $("#adminApp").classList.remove("hidden");

  $$(".admin-page").forEach(el => el.classList.add("hidden"));
  $("#" + page + "Page").classList.remove("hidden");
  $$(".side-link").forEach(el => el.classList.toggle("active", el.dataset.page === page));
  $("#breadcrumb").textContent = pageNames[page];
  $("#sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});

  if (page === "dashboard") renderDashboard();
  if (page === "coursesAdmin") renderAdminCourses();
  if (page === "students") renderTables();
  if (page === "orders") renderTables();
}

function showPublicSite() {
  $("#adminApp").classList.add("hidden");
  $("#publicSite").classList.remove("hidden");
  $("#sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}

function openCourseModal(course = null) {
  $("#courseForm").reset();
  $("#editCourseId").value = course ? course.id : "";
  $("#courseModalTitle").textContent = course ? "Edit course" : "Create a course";
  $("#newCourseTitle").value = course?.title || "";
  $("#newCourseCategory").value = course?.category || "Technology";
  $("#newCoursePrice").value = course?.price ?? 999;
  $("#newCourseDescription").value = course?.description || "";
  $("#newCourseImage").value = course?.image || "";
  $("#courseModal").classList.remove("hidden");
}

function openCourseDetail(id) {
  const c = courses.find(item => item.id === Number(id));
  if (!c) return;

  $("#courseDetailContent").innerHTML = `
    <div class="modal-head"><div><div class="eyebrow">COURSE OVERVIEW</div><h2>${escapeHTML(c.title)}</h2></div><button class="icon-btn" data-close="courseDetailModal" aria-label="Close">✕</button></div>
    ${imageHTML(c.image,c.title,"detail-cover")}
    <div class="course-meta"><span>${escapeHTML(c.category)}</span><span class="rating">★ ${c.rating} rating</span></div>
    <p class="detail-description">${escapeHTML(c.description)}</p>
    <div class="detail-points"><span>▤ ${c.lessons} lessons</span><span>♙ ${c.students} learners</span><span>◷ Learn at your pace</span></div>
    <div class="course-bottom"><div class="price">${money(c.price)}</div><button class="btn btn-gold" data-demo-enroll="${c.id}">Enroll in demo ↗</button></div>
    <p class="modal-subtitle" style="margin:17px 0 0">Demo preview only. No payment will be taken and no course access is granted.</p>`;

  $("#courseDetailModal").classList.remove("hidden");
}

function openAuth(mode) {
  authMode = mode;
  $("#authTitle").textContent = mode === "login" ? "Welcome back" : "Start your journey";
  $("#authSubmit").textContent = mode === "login" ? "Continue to demo" : "Preview your account";
  $("#authSwitch").firstChild.textContent = mode === "login" ? "New to Skillora? " : "Already have an account? ";
  $("#authSwitchBtn").textContent = mode === "login" ? "Create account" : "Log in";
  $("#authModal").classList.remove("hidden");
}

function closeModal(id) {
  $("#" + id)?.classList.add("hidden");
}

function downloadCSV(filename, rows) {
  const csv = rows.map(row => row.map(value =>
    `"${String(value ?? "").replace(/"/g,'""')}"`
  ).join(",")).join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url),1000);
}

function init() {
  renderPublicCourses();
  renderAdminCourses();
  renderDashboard();

  $("#courseSearch").addEventListener("input", renderPublicCourses);

  $("#categoryFilters").addEventListener("click", e => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    $$(".filter-chip").forEach(chip => chip.classList.toggle("active",chip === btn));
    renderPublicCourses();
  });

  $("#showAllCourses").addEventListener("click", () => {
    showAll = !showAll;
    renderPublicCourses();
  });

  $("#courseGrid").addEventListener("click", e => {
    const btn = e.target.closest("[data-view-course]");
    if (btn) openCourseDetail(btn.dataset.viewCourse);
  });

  $("#publicSite").addEventListener("click", e => {
    const page = e.target.closest("[data-page]");
    if (page && page.dataset.page === "home") {
      e.preventDefault();
      showPublicSite();
    }
  });

  $("#loginOpen").addEventListener("click", () => openAuth("login"));
  $("#signupOpen").addEventListener("click", () => openAuth("signup"));
  $("#heroLogin").addEventListener("click", () => openAuth("signup"));
  $("#ctaSignup").addEventListener("click", () => openAuth("signup"));
  $("#authSwitchBtn").addEventListener("click", () => openAuth(authMode === "login" ? "signup" : "login"));

  $("#authForm").addEventListener("submit", e => {
    e.preventDefault();
    closeModal("authModal");
    toast("Demo only: authentication is not connected yet.");
  });

  $("#adminApp").addEventListener("click", e => {
    const pageBtn = e.target.closest("[data-page]");
    if (pageBtn && pageNames[pageBtn.dataset.page]) {
      e.preventDefault();
      showPage(pageBtn.dataset.page);
    }
  });

  $("#logoutBtn").addEventListener("click", showPublicSite);
  $("#addCourseBtn").addEventListener("click", () => openCourseModal());
  $("#addCourseTop").addEventListener("click", () => openCourseModal());

  $("#adminCourseSearch").addEventListener("input", renderAdminCourses);
  $("#adminCourseCategory").addEventListener("change", renderAdminCourses);
  $("#revenuePeriod").addEventListener("change", renderChart);
  $("#studentSearch").addEventListener("input", () => {
    $("#studentsTable").innerHTML = studentRows($("#studentSearch").value);
  });

  $("#adminCourseList").addEventListener("click", e => {
    const edit = e.target.closest("[data-edit-course]");
    const del = e.target.closest("[data-delete-course]");

    if (edit) {
      const course = courses.find(c => c.id === Number(edit.dataset.editCourse));
      if (course) openCourseModal(course);
    }

    if (del) {
      const id = Number(del.dataset.deleteCourse);
      const course = courses.find(c => c.id === id);
      if (!course) return;
      if (confirm(`Delete "${course.title}" from this demo?`)) {
        courses = courses.filter(c => c.id !== id);
        renderPublicCourses();
        renderAdminCourses();
        renderDashboard();
        toast("Course removed from the current demo.");
      }
    }
  });

  $("#courseForm").addEventListener("submit", e => {
    e.preventDefault();

    const id = Number($("#editCourseId").value);
    const title = $("#newCourseTitle").value.trim();
    const description = $("#newCourseDescription").value.trim();
    const price = Number($("#newCoursePrice").value);
    const image = $("#newCourseImage").value.trim();

    if (!title || !description || !Number.isFinite(price) || price < 0) {
      toast("Please enter valid course details.");
      return;
    }

    const data = {
      title,
      category:$("#newCourseCategory").value,
      price,
      description,
      image:image ? safeImage(image) : imageFallback
    };

    if (id) {
      courses = courses.map(c => c.id === id ? {...c,...data} : c);
      toast("Course updated in this demo.");
    } else {
      courses.unshift({
        ...data,id:nextId++,students:0,rating:5,lessons:1
      });
      toast("Course added to this demo.");
    }

    closeModal("courseModal");
    renderPublicCourses();
    renderAdminCourses();
    renderDashboard();
  });

  $("#courseDetailModal").addEventListener("click", e => {
    const btn = e.target.closest("[data-demo-enroll]");
    if (!btn) return;
    closeModal("courseDetailModal");
    toast("Demo only: connect verified payments to enable enrollment.");
  });

  $("#exportStudents").addEventListener("click", () => {
    downloadCSV("skillora-demo-students.csv",[
      ["Name","Email","Courses","Joined","Status"],
      ...students.map(s=>[s.name,s.email,s.courses,s.date,s.status])
    ]);
  });

  $("#exportOrders").addEventListener("click", () => {
    downloadCSV("skillora-demo-orders.csv",[
      ["Order ID","Student","Email","Course","Date","Amount","Status"],
      ...orders.map(o=>[o.id,o.name,o.email,o.course,o.date,o.amount,o.status])
    ]);
  });

  $("#mediaInfo").addEventListener("click", () => {
    toast("Real uploads require secure storage and backend permissions.");
  });

  $("#notificationBtn").addEventListener("click", () => {
    toast("No live notifications in this demo.");
  });

  $("#saveSettings").addEventListener("click", () => {
    const name = $("#academyName").value.trim();
    const email = $("#academyEmail").value.trim();

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Enter an academy name and valid email.");
      return;
    }

    currentCurrency = $("#academyCurrency").value;
    $$(".brand").forEach(brand => {
      if (brand.closest(".site-footer") || brand.closest(".topbar") || brand.closest(".sidebar")) {
        brand.setAttribute("aria-label",name);
      }
    });

    document.title = name + " | Learn Without Limits";
    toast("Demo settings applied in this page session.");
    renderPublicCourses();
    renderAdminCourses();
    renderDashboard();
  });

  $("#menuToggle").addEventListener("click", () => {
    $("#menuToggle").setAttribute("aria-expanded",String(!$("#navLinks")?.classList.contains("open")));
    $(".nav-links").classList.toggle("open");
  });

  $("#adminMenuToggle").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
  });

  document.addEventListener("click", e => {
    const close = e.target.closest("[data-close]");
    if (close) closeModal(close.dataset.close);

    if (e.target.classList.contains("modal-backdrop")) {
      e.target.classList.add("hidden");
    }

    if (!e.target.closest(".topbar") && $(".nav-links").classList.contains("open")) {
      $(".nav-links").classList.remove("open");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      $$(".modal-backdrop").forEach(modal => modal.classList.add("hidden"));
      $("#sidebar").classList.remove("open");
      $(".nav-links").classList.remove("open");
    }
  });
}

init();
