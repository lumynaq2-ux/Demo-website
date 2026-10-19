
"use strict";

/* SKILLORA ACADEMY — INTERACTIVE FRONTEND DEMO
   All records are sample data stored in browser memory.
   This is not a production payment or authentication system.
*/

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const icons = {
  Development: "⌘",
  Design: "✳",
  Marketing: "↗",
  Business: "◇"
};

const palettes = {
  Development: "purple",
  Design: "blue",
  Marketing: "orange",
  Business: "green"
};

let courses = [
  {
    id: 1,
    title: "Complete Web Development",
    category: "Development",
    description: "Build modern websites from scratch using HTML, CSS and JavaScript.",
    price: 2499,
    students: 328,
    lessons: 42,
    status: "Published",
    palette: "purple",
    rating: "4.9"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    category: "Design",
    description: "Learn design systems, wireframes, prototypes and user research.",
    price: 1999,
    students: 246,
    lessons: 36,
    status: "Published",
    palette: "blue",
    rating: "4.8"
  },
  {
    id: 3,
    title: "Digital Marketing Pro",
    category: "Marketing",
    description: "Master SEO, content strategy, social media and digital campaigns.",
    price: 1499,
    students: 195,
    lessons: 28,
    status: "Published",
    palette: "orange",
    rating: "4.7"
  },
  {
    id: 4,
    title: "Business & Entrepreneurship",
    category: "Business",
    description: "Turn ideas into practical business plans and sustainable growth.",
    price: 2999,
    students: 174,
    lessons: 31,
    status: "Published",
    palette: "green",
    rating: "4.9"
  },
  {
    id: 5,
    title: "Advanced JavaScript",
    category: "Development",
    description: "Explore modern JavaScript patterns, async code and APIs.",
    price: 1799,
    students: 218,
    lessons: 25,
    status: "Published",
    palette: "gold",
    rating: "4.8"
  },
  {
    id: 6,
    title: "Brand Identity Essentials",
    category: "Design",
    description: "Create memorable brands with typography, color and visual systems.",
    price: 999,
    students: 123,
    lessons: 19,
    status: "Draft",
    palette: "pink",
    rating: "4.6"
  }
];

let orders = [
  { id: "SK-1048", name: "Priya Sharma", email: "priya@example.com", course: "Complete Web Development", date: "19 Oct 2026", amount: 2499, status: "Paid", initials: "PS", color: "purple" },
  { id: "SK-1047", name: "Rahul Verma", email: "rahul@example.com", course: "UI/UX Design Masterclass", date: "19 Oct 2026", amount: 1999, status: "Paid", initials: "RV", color: "blue" },
  { id: "SK-1046", name: "Ananya Gupta", email: "ananya@example.com", course: "Digital Marketing Pro", date: "18 Oct 2026", amount: 1499, status: "Paid", initials: "AG", color: "pink" },
  { id: "SK-1045", name: "Arjun Mehta", email: "arjun@example.com", course: "Business & Entrepreneurship", date: "18 Oct 2026", amount: 2999, status: "Pending", initials: "AM", color: "green" },
  { id: "SK-1044", name: "Sneha Patel", email: "sneha@example.com", course: "Advanced JavaScript", date: "17 Oct 2026", amount: 1799, status: "Paid", initials: "SP", color: "orange" },
  { id: "SK-1043", name: "Kabir Singh", email: "kabir@example.com", course: "UI/UX Design Masterclass", date: "16 Oct 2026", amount: 1999, status: "Refunded", initials: "KS", color: "blue" },
  { id: "SK-1042", name: "Meera Joshi", email: "meera@example.com", course: "Complete Web Development", date: "15 Oct 2026", amount: 2499, status: "Paid", initials: "MJ", color: "green" }
];

const students = [
  { name: "Priya Sharma", email: "priya@example.com", course: "Complete Web Development", joined: "19 Oct 2026", progress: 78, status: "Active", initials: "PS", color: "purple" },
  { name: "Rahul Verma", email: "rahul@example.com", course: "UI/UX Design Masterclass", joined: "18 Oct 2026", progress: 64, status: "Active", initials: "RV", color: "blue" },
  { name: "Ananya Gupta", email: "ananya@example.com", course: "Digital Marketing Pro", joined: "17 Oct 2026", progress: 92, status: "Active", initials: "AG", color: "pink" },
  { name: "Arjun Mehta", email: "arjun@example.com", course: "Business & Entrepreneurship", joined: "16 Oct 2026", progress: 28, status: "Active", initials: "AM", color: "green" },
  { name: "Sneha Patel", email: "sneha@example.com", course: "Advanced JavaScript", joined: "14 Oct 2026", progress: 55, status: "Active", initials: "SP", color: "orange" },
  { name: "Kabir Singh", email: "kabir@example.com", course: "UI/UX Design Masterclass", joined: "12 Oct 2026", progress: 100, status: "Completed", initials: "KS", color: "blue" },
  { name: "Meera Joshi", email: "meera@example.com", course: "Complete Web Development", joined: "10 Oct 2026", progress: 43, status: "Active", initials: "MJ", color: "green" }
];

let resources = [
  { title: "Welcome to Skillora", type: "Video", url: "", size: "Demo resource" },
  { title: "Course planning workbook", type: "PDF", url: "", size: "Demo resource" },
  { title: "Brand design reference", type: "Document", url: "", size: "Demo resource" }
];

let coupons = [
  { code: "WELCOME10", discount: 10, uses: 86, status: "Active" },
  { code: "STUDENT20", discount: 20, uses: 42, status: "Active" },
  { code: "LAUNCH15", discount: 15, uses: 0, status: "Draft" }
];

let nextCourseId = 7;
let nextOrderId = 1049;

/* HELPERS */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function safeURL(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function money(value) {
  return "₹" + Number(value || 0).toLocaleString("en-IN");
}

function toast(title, message = "") {
  const container = $("#toastContainer");
  if (!container) return;

  const element = document.createElement("div");
  element.className = "toast";

  const heading = document.createElement("b");
  heading.textContent = title;
  element.appendChild(heading);

  if (message) {
    const detail = document.createElement("small");
    detail.textContent = message;
    element.appendChild(detail);
  }

  container.appendChild(element);

  window.setTimeout(() => {
    element.remove();
  }, 3600);
}

function statusClass(status) {
  if (status === "Paid" || status === "Published" ||
      status === "Active" || status === "Completed") {
    return "published";
  }
  if (status === "Refunded") return "refunded";
  return "draft";
}

function avatarHTML(initials, color = "purple") {
  return `<div class="avatar avatar-${escapeHTML(color)}">${escapeHTML(initials)}</div>`;
}

function studentCell(name, email, initials, color) {
  return `<div class="student-cell">
    ${avatarHTML(initials, color)}
    <div><b>${escapeHTML(name)}</b><small>${escapeHTML(email)}</small></div>
  </div>`;
}

function emptyTable(message, columns) {
  return `<tr><td colspan="${columns}" class="empty-table">${escapeHTML(message)}</td></tr>`;
}

/* PAGE NAVIGATION */

function showPage(page) {
  const target = $("#page-" + page);

  if (!target) return;

  $$(".page").forEach(section => section.classList.remove("active"));
  target.classList.add("active");

  $$(".nav-link[data-page]").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  const pageName = ({
    overview: "Overview",
    courses: "Courses",
    students: "Students",
    orders: "Orders",
    analytics: "Analytics",
    library: "Content library",
    coupons: "Coupons",
    settings: "Settings"
  })[page] || "Overview";

  $("#breadcrumbTitle").textContent = pageName;
  $("#sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");

  if (pageButton) {
    event.preventDefault();
    showPage(pageButton.dataset.page);
    return;
  }

  const modalButton = event.target.closest("[data-modal]");

  if (modalButton) {
    openModal(modalButton.dataset.modal);
  }
});

$("#mobileMenu").addEventListener("click", () => {
  $("#sidebar").classList.toggle("open");
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    $("#globalSearch").focus();
  }

  if (event.key === "Escape") {
    closeModals();
    $("#sidebar").classList.remove("open");
  }
});

/* MODALS */

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  const input = $("input:not([type=hidden])", modal);
  if (input) window.setTimeout(() => input.focus(), 100);
}

function closeModals() {
  $$(".modal-backdrop.open").forEach(modal => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
}

$$(".close-modal").forEach(button => {
  button.addEventListener("click", closeModals);
});

$$(".modal-backdrop").forEach(backdrop => {
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeModals();
  });
});

/* COURSE CATALOG */

function renderCourses() {
  const grid = $("#courseGrid");
  const query = ($("#courseSearch").value || "").trim().toLowerCase();
  const category = $("#courseCategory").value;
  const status = $("#courseStatus").value;

  const filtered = courses.filter(course => {
    const matchesQuery = (course.title + " " + course.description + " " + course.category)
      .toLowerCase().includes(query);

    return matchesQuery &&
      (category === "all" || course.category === category) &&
      (status === "all" || course.status === status);
  });

  $("#navCourseCount").textContent = courses.length;
  $("#courseStat").textContent = courses.filter(c => c.status === "Published").length;

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">No matching courses found. Try another search.</div>';
    return;
  }

  grid.innerHTML = filtered.map(course => {
    const palette = course.palette || palettes[course.category] || "purple";
    const icon = icons[course.category] || "✦";

    return `<article class="course-card">
      <div class="course-cover cover-${escapeHTML(palette)}">
        <span class="cover-icon">${icon}</span>
        <span class="status-pill ${statusClass(course.status)}">${escapeHTML(course.status)}</span>
      </div>
      <div class="course-body">
        <span class="course-category">${escapeHTML(course.category)}</span>
        <h3>${escapeHTML(course.title)}</h3>
        <p>${escapeHTML(course.description || "Explore this course and start learning new skills.")}</p>
        <div class="course-meta"><span>▤ ${course.lessons} lessons</span><span>♧ ${course.students} students</span><span>★ ${course.rating || "New"}</span></div>
        <div class="course-bottom">
          <strong>${money(course.price)}</strong>
          <div class="course-actions">
            <button class="mini-action" data-course-action="edit" data-id="${course.id}">Edit</button>
            <button class="mini-action" data-course-action="toggle" data-id="${course.id}">${course.status === "Published" ? "Unpublish" : "Publish"}</button>
          </div>
        </div>
      </div>
    </article>`;
  }).join("");
}

$("#courseSearch").addEventListener("input", renderCourses);
$("#courseCategory").addEventListener("change", renderCourses);
$("#courseStatus").addEventListener("change", renderCourses);

$("#courseGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-course-action]");
  if (!button) return;

  const course = courses.find(item => item.id === Number(button.dataset.id));
  if (!course) return;

  if (button.dataset.courseAction === "toggle") {
    course.status = course.status === "Published" ? "Draft" : "Published";
    renderAll();
    toast("Course status updated", `${course.title} is now ${course.status.toLowerCase()}.`);
    return;
  }

  $("#courseForm").elements.title.value = course.title;
  $("#courseForm").elements.category.value = course.category;
  $("#courseForm").elements.price.value = course.price;
  $("#courseForm").elements.description.value = course.description;
  $("#courseForm").elements.image.value = "";
  $("#courseForm").dataset.editingId = String(course.id);

  $(".modal-head h2", $("#courseModal")).textContent = "Edit course";
  openModal("courseModal");
});

$("#courseForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  const category = String(data.get("category") || "Development");
  const price = Number(data.get("price"));
  const description = String(data.get("description") || "").trim();
  const image = safeURL(data.get("image"));

  if (!title || !Number.isFinite(price) || price < 0 || price > 1000000) {
    toast("Please check the course details", "Enter a valid title and price.");
    return;
  }

  const editingId = Number(form.dataset.editingId);
  let course;

  if (editingId) {
    course = courses.find(item => item.id === editingId);
    if (!course) return;

    Object.assign(course, {
      title, category, price, description,
      palette: palettes[category] || "purple"
    });

    delete form.dataset.editingId;
    toast("Course updated", `${title} has been updated in this demo.`);
  } else {
    course = {
      id: nextCourseId++,
      title,
      category,
      price,
      description: description || "A new learning experience from Skillora Academy.",
      students: 0,
      lessons: 0,
      status: "Draft",
      palette: palettes[category] || "purple",
      rating: "New",
      image
    };

    courses.unshift(course);
    toast("Course created", `${title} has been added as a draft.`);
  }

  form.reset();
  $(".modal-head h2", $("#courseModal")).textContent = "Create a course";
  closeModals();
  renderAll();
  showPage("courses");
});

/* TOP COURSES */

function renderTopCourses() {
  const sorted = [...courses]
    .sort((a, b) => b.students - a.students)
    .slice(0, 4);

  $("#topCourses").innerHTML = sorted.map(course => {
    const palette = course.palette || "purple";
    const icon = icons[course.category] || "✦";

    return `<div class="top-course-item">
      <div class="course-thumb thumb-${escapeHTML(palette)}">${icon}</div>
      <div class="top-course-copy">
        <b>${escapeHTML(course.title)}</b>
        <small>${course.students} enrolled students</small>
      </div>
      <span class="top-course-price">${money(course.price)}</span>
    </div>`;
  }).join("");
}

/* ORDERS */

function renderOrders() {
  const filter = $("#orderFilter").value;
  const filtered = orders.filter(order => filter === "all" || order.status === filter);

  $("#orderCount").textContent = (1092 + orders.length - 7).toLocaleString("en-IN");

  $("#recentOrders").innerHTML = orders.slice(0, 5).map(order => `
    <tr>
      <td>${studentCell(order.name, order.email, order.initials, order.color)}</td>
      <td>${escapeHTML(order.course)}</td>
      <td>${escapeHTML(order.date)}</td>
      <td><b>${money(order.amount)}</b></td>
      <td><span class="status-pill ${statusClass(order.status)}">${escapeHTML(order.status)}</span></td>
    </tr>`).join("") || emptyTable("No orders yet.", 5);

  $("#ordersTable").innerHTML = filtered.map(order => `
    <tr>
      <td><b>${escapeHTML(order.id)}</b></td>
      <td>${studentCell(order.name, order.email, order.initials, order.color)}</td>
      <td>${escapeHTML(order.course)}</td>
      <td>${escapeHTML(order.date)}</td>
      <td><b>${money(order.amount)}</b></td>
      <td><span class="status-pill ${statusClass(order.status)}">${escapeHTML(order.status)}</span></td>
    </tr>`).join("") || emptyTable("No orders match this filter.", 6);
}

$("#orderFilter").addEventListener("change", renderOrders);

/* STUDENTS */

function renderStudents() {
  const query = ($("#studentSearch").value || "").trim().toLowerCase();

  const filtered = students.filter(student =>
    (student.name + " " + student.email + " " + student.course)
      .toLowerCase().includes(query)
  );

  $("#studentTable").innerHTML = filtered.map(student => `
    <tr>
      <td>${studentCell(student.name, student.email, student.initials, student.color)}</td>
      <td>${escapeHTML(student.course)}</td>
      <td>${escapeHTML(student.joined)}</td>
      <td><div style="display:flex;align-items:center;gap:8px">
        <div class="progress-track"><span style="width:${student.progress}%"></span></div>
        <small>${student.progress}%</small>
      </div></td>
      <td><span class="status-pill published">${escapeHTML(student.status)}</span></td>
    </tr>`).join("") || emptyTable("No matching students found.", 5);
}

$("#studentSearch").addEventListener("input", renderStudents);

/* CONTENT LIBRARY */

function renderResources() {
  $("#resourceGrid").innerHTML = resources.map((resource, index) => {
    const symbol = resource.type === "Video" ? "▶" : resource.type === "PDF" ? "▤" : "▧";

    return `<article class="resource-card">
      <div class="resource-icon">${symbol}</div>
      <div class="resource-copy">
        <b>${escapeHTML(resource.title)}</b>
        <small>${escapeHTML(resource.type)} · ${escapeHTML(resource.size)}</small>
      </div>
      <button class="mini-action" data-resource-delete="${index}" aria-label="Remove resource">×</button>
    </article>`;
  }).join("");
}

$("#resourceForm").addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const title = String(data.get("title") || "").trim();

  if (!title) return;

  resources.unshift({
    title,
    type: String(data.get("type") || "Document"),
    url: safeURL(data.get("url")),
    size: "Demo resource"
  });

  event.currentTarget.reset();
  closeModals();
  renderResources();
  toast("Resource added", "The sample resource now appears in your library.");
});

$("#resourceGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-resource-delete]");
  if (!button) return;

  resources.splice(Number(button.dataset.resourceDelete), 1);
  renderResources();
  toast("Resource removed", "The demo entry was removed from the library.");
});

/* COUPONS */

function renderCoupons() {
  $("#couponTable").innerHTML = coupons.map(coupon => `
    <tr>
      <td><b>${escapeHTML(coupon.code)}</b></td>
      <td>${coupon.discount}% off</td>
      <td>${coupon.uses}</td>
      <td><span class="status-pill ${statusClass(coupon.status)}">${escapeHTML(coupon.status)}</span></td>
    </tr>`).join("");
}

$("#couponForm").addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const code = String(data.get("code") || "").trim().toUpperCase();
  const discount = Number(data.get("discount"));

  if (!/^[A-Z0-9_-]{3,24}$/.test(code)) {
    toast("Invalid coupon code", "Use 3–24 letters, numbers, hyphens or underscores.");
    return;
  }

  if (!Number.isInteger(discount) || discount < 1 || discount > 100) {
    toast("Invalid discount", "Choose a percentage between 1 and 100.");
    return;
  }

  if (coupons.some(coupon => coupon.code === code)) {
    toast("Coupon already exists", "Choose a different coupon code.");
    return;
  }

  coupons.unshift({ code, discount, uses: 0, status: "Active" });
  event.currentTarget.reset();
  closeModals();
  renderCoupons();
  toast("Coupon created", `${code} is now listed in your demo.`);
});

/* GLOBAL SEARCH */

$("#globalSearch").addEventListener("input", event => {
  const query = event.target.value.trim().toLowerCase();
  if (!query) return;

  const matchingCourse = courses.some(course =>
    (course.title + " " + course.category).toLowerCase().includes(query)
  );

  const matchingStudent = students.some(student =>
    (student.name + " " + student.email).toLowerCase().includes(query)
  );

  const matchingOrder = orders.some(order =>
    (order.id + " " + order.name + " " + order.course).toLowerCase().includes(query)
  );

  if (matchingCourse) {
    showPage("courses");
    $("#courseSearch").value = query;
    renderCourses();
  } else if (matchingStudent) {
    showPage("students");
    $("#studentSearch").value = query;
    renderStudents();
  } else if (matchingOrder) {
    showPage("orders");
    $("#orderFilter").value = "all";
    renderOrders();
    toast("Matching orders found", "Review the orders list for matching records.");
  }
});

/* DATE RANGE DEMO */

$("#overviewPeriod").addEventListener("change", event => {
  const days = Number(event.target.value);
  const factor = days === 7 ? 0.28 : days === 90 ? 2.4 : 1;
  const amount = Math.round(248500 * factor);

  $("#revenueValue").textContent = money(amount);
  $("#chartTotal").textContent = money(amount);

  const points = days === 7
    ? "M0 180 C70 150 110 170 170 120 S250 140 320 95 S420 120 490 65 S610 75 700 20"
    : days === 90
      ? "M0 190 C50 180 80 130 130 145 S200 100 260 120 S330 60 390 90 S480 40 530 65 S630 30 700 15"
      : "M0 165 C50 145 70 172 110 130 S175 150 220 110 S280 130 325 88 S390 105 435 76 S500 105 545 55 S630 80 700 20";

  $("#linePath").setAttribute("d", points);
  $("#areaPath").setAttribute("d", points + " L700 210 L0 210Z");

  toast("Date range updated", `Showing illustrative figures for the last ${days} days.`);
});

$("#analyticsPeriod").addEventListener("change", event => {
  toast("Analytics range updated", `Selected last ${event.target.value} days. Figures are illustrative.`);
});

/* SETTINGS */

$("#settingsForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("#academyName").value.trim();
  const email = $("#supportEmail").value.trim();

  if (!name || !email) {
    toast("Please complete the settings");
    return;
  }

  $(".workspace-copy b").textContent = name;
  toast("Preferences saved", "Your workspace name has been updated in this demo.");
});

/* EXPORT SAMPLE DATA TO CSV */

function downloadCSV(filename, rows) {
  if (!rows.length) {
    toast("Nothing to export", "No records are available.");
    return;
  }

  const csv = rows.map(row => row.map(value => {
    let text = String(value ?? "");
    if (/^[\s]*[=+\-@]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }).join(",")).join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Export prepared", `${filename} has been generated from demo data.`);
}

$("#exportReport").addEventListener("click", () => {
  downloadCSV("skillora-demo-report.csv", [
    ["Metric", "Value"],
    ["Sample revenue INR", 248500],
    ["Sample active students", 1284],
    ["Published courses", courses.filter(c => c.status === "Published").length],
    ["Sample conversion rate", "4.8%"],
    ["Note", "Illustrative demo data, not real business analytics"]
  ]);
});

$("#exportStudents").addEventListener("click", () => {
  downloadCSV("skillora-demo-students.csv", [
    ["Name", "Email", "Course", "Joined", "Progress", "Status"],
    ...students.map(s => [s.name, s.email, s.course, s.joined, s.progress + "%", s.status])
  ]);
});

$("#exportOrders").addEventListener("click", () => {
  downloadCSV("skillora-demo-orders.csv", [
    ["Order ID", "Student", "Email", "Course", "Date", "Amount INR", "Status"],
    ...orders.map(o => [o.id, o.name, o.email, o.course, o.date, o.amount, o.status])
  ]);
});

/* OTHER INTERACTIONS */

$("#dismissNotice").addEventListener("click", () => {
  $("#notice").remove();
});

$("#notificationBtn").addEventListener("click", () => {
  toast("You're all caught up", "There are no new demo notifications.");
});

$("#profileBtn").addEventListener("click", () => {
  toast("Administrator profile", "Alex Morgan · Demo workspace");
});

$("#helpBtn").addEventListener("click", () => {
  toast("Welcome to Skillora", "Explore the dashboard, create a sample course, or browse the content library.");
});

/* RENDER EVERYTHING */

function renderAll() {
  renderCourses();
  renderTopCourses();
  renderOrders();
  renderStudents();
  renderResources();
  renderCoupons();
}

renderAll();
