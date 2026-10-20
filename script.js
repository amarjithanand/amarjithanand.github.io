/* Portfolio content — edit here. Only resume-verified or user-supplied details. */
window.PORTFOLIO = {
  education: [
    { title: "Master of Computer Applications (MCA)", institution: "APJ Abdul Kalam Technological University", duration: "2025 — Present", details: "Currently pursuing", current: true },
    { title: "Bachelor of Science in Computer Science", institution: "Kannur University", duration: "2022 — May 2025", details: "CGPA 8.75" },
    { title: "Higher Secondary Education (+2)", institution: "Rajeev Gandhi Memorial Higher Secondary School, Mokeri", duration: "", details: "96%", stream: "" },
    { title: "SSLC", institution: "Rajeev Gandhi Memorial Higher Secondary School, Mokeri", duration: "", details: "95%" }
  ],
  skills: [
    { title: "Programming Languages", items: ["Python", "Java", "C++", "JavaScript", "SQL"] },
    { title: "Data Science & AI", items: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Data Analysis", "Semantic Embeddings", "Sentence Transformers", "Model Evaluation"] },
    { title: "Web & App Development", items: ["FastAPI", "HTML", "CSS", "React", "Node.js", "Flutter"] },
    { title: "Tools & Platforms", items: ["Git", "GitHub", "Gmail API", "Firebase", "Cloud Firestore", "Google Cloud", "Google Colab", "Netlify", "Cloudflare"] }
  ],

  // repo / demo: set to a real URL to show the link; leave "" to hide it.
  projects: [
    {
      title: "AI-Powered Gmail Email Classifier",
      tag: "AI / NLP",
      icon: "mail",
      description: "An intelligent email classification system using Sentence Transformer semantic embeddings, a confidence-based prediction pipeline and an LLM fallback for low-confidence emails. Integrates the Gmail API and FastAPI for real-time classification and label management.",
      tech: ["Python", "NLP", "Sentence Transformers", "FastAPI", "Gmail API", "LLM APIs"],
      repo: "",
      demo: ""
    },
    {
      title: "HabitScope — ML-Driven Behavioral Analytics",
      tag: "Machine Learning",
      icon: "chart",
      description: "A productivity and behavioral analytics platform designed to analyze user activity patterns and derive meaningful productivity insights using machine learning.",
      tech: ["Python", "Machine Learning", "Data Analysis"],
      repo: "",
      demo: ""
    },
    {
      title: "DeptConnect",
      tag: "MCA Mini-Project",
      icon: "hub",
      description: "An MCA mini-project designed to connect students with departmental information, activities, and relevant academic resources.",
      tech: ["Web Application"],
      repo: "",
      demo: ""
    },
    {
      title: "Migrant Connect — Job Management System",
      tag: "Mobile App",
      icon: "phone",
      description: "A mobile application connecting workers, contractors and job providers, with user and admin modules. Built in a team of 3 following SDLC practices — requirement analysis, design, development and testing.",
      tech: ["Flutter", "Firebase", "Cloud Firestore"],
      repo: "",
      demo: ""
    }
  ],

  // Set verified: true once confirmed (e.g. add the Future Interns internship here).
  experience: [
    {
      verified: true,
      role: "Technical Lead — College Magazine Committee",
      org: "MG College, Iritty",
      duration: "2023 – 24",
      description: "Served as Technical Lead for the college magazine, managing overall technical aspects, while contributing as Sub-Editor for the department magazine, assisting with content editing and maintaining publication quality.",
      tags: ["Leadership", "Digital Content", "Coordination"]
    },
    {
      verified: false,
      role: "Data Science and Analytics Intern",
      org: "Future Interns",
      duration: "",
      description: "Add a description of the work once confirmed.",
      tags: ["Data Science", "Analytics"]
    }
  ],

  certifications: [
    { verified: true, title: "Introduction to Git and GitHub", org: "Google", date: "", link: "" },
    { verified: true, title: "Programming in Java", org: "IIT Kharagpur · NPTEL", date: "", link: "" },
    { verified: true, title: "UGC NET Qualified", org: "National Eligibility Test — Assistant Professor eligibility", date: "2026", link: "" },
    { verified: false, title: "IBM Data Science Professional Certificate", org: "IBM", date: "", link: "" }
  ]
};
(function () {
  "use strict";
  var D = window.PORTFOLIO;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function badges(list, cls) {
    var ul = el("ul", "badges");
    list.forEach(function (t) { ul.appendChild(el("li", "badge" + (cls ? " " + cls : ""), t)); });
    return ul;
  }

  var ICONS = {
    mail: '<rect x="14" y="22" width="52" height="36" rx="4"/><path d="M14 26l26 18 26-18"/>',
    chart: '<path d="M14 60h52"/><rect x="20" y="40" width="8" height="20"/><rect x="36" y="28" width="8" height="32"/><rect x="52" y="18" width="8" height="42"/>',
    hub: '<circle cx="40" cy="40" r="7"/><circle cx="18" cy="20" r="5"/><circle cx="62" cy="20" r="5"/><circle cx="18" cy="60" r="5"/><circle cx="62" cy="60" r="5"/><path d="M22 23l13 12M58 23L45 35M22 57l13-12M58 57L45 45"/>',
    phone: '<rect x="27" y="12" width="26" height="56" rx="5"/><path d="M36 60h8"/>'
  };

  function renderSkills() {
    var g = document.getElementById("skillsGrid");
    D.skills.forEach(function (s) {
      var c = el("article", "card skill");
      c.appendChild(el("h3", "card__title", s.title));
      c.appendChild(badges(s.items));
      g.appendChild(c);
    });
  }

  function link(href, label, cls) {
    var a = el("a", cls, label);
    a.href = href; a.target = "_blank"; a.rel = "noopener";
    return a;
  }

  function renderProjects() {
    var g = document.getElementById("projectsGrid");
    D.projects.forEach(function (p) {
      var c = el("article", "card project");
      var thumb = el("div", "project__thumb");
      thumb.innerHTML = '<svg viewBox="0 0 80 80" aria-hidden="true">' + (ICONS[p.icon] || "") + "</svg>";
      thumb.appendChild(el("span", "project__tag mono", p.tag));
      c.appendChild(thumb);
      var body = el("div", "project__body");
      body.appendChild(el("h3", "card__title", p.title));
      body.appendChild(el("p", "muted", p.description));
      body.appendChild(badges(p.tech, "badge--sm"));
      var actions = el("div", "project__actions");
      var primary = p.demo || p.repo;
      if (primary) actions.appendChild(link(primary, "View Project →", "btn btn--primary btn--sm"));
      if (p.repo) actions.appendChild(link(p.repo, "GitHub", "btn btn--ghost btn--sm"));
      if (p.demo) actions.appendChild(link(p.demo, "Live Demo", "btn btn--ghost btn--sm"));
      if (!primary) {
        actions.appendChild(link("https://github.com/amarjithanand", "View on GitHub →", "btn btn--ghost btn--sm"));
      }
      body.appendChild(actions);
      c.appendChild(body);
      g.appendChild(c);
    });
  }

  function renderExperience() {
    var g = document.getElementById("experienceList");
    D.experience.filter(function (x) { return x.verified; }).sort(function (a, b) {
      return (parseInt(b.duration, 10) || 0) - (parseInt(a.duration, 10) || 0);
    }).forEach(function (x, index) {
      var c = el("li", "timeline__item exp" + (x.current ? " is-current" : ""));
      var head = el("div", "exp__head");
      var t = el("div");
      t.appendChild(el("h3", "card__title", x.role));
      t.appendChild(el("p", "accent-text", x.org));
      head.appendChild(t);
      if (x.duration) head.appendChild(el("span", "mono muted", x.duration));
      c.appendChild(head);
      c.appendChild(el("p", "muted", x.description));
      if (x.tags && x.tags.length) c.appendChild(badges(x.tags, "badge--sm"));
      g.appendChild(c);
    });
  }

  function renderEducation() {
    var g = document.getElementById("educationList");
    D.education.forEach(function (x) {
      var item = el("li", "timeline__item" + (x.current ? " is-current" : ""));
      item.appendChild(el("h3", "card__title", x.title));
      if (x.institution) item.appendChild(el("p", "accent-text", x.institution));
      if (x.duration) item.appendChild(el("p", "mono", x.duration));
      if (x.stream) item.appendChild(el("p", "muted", x.stream));
      if (x.details) item.appendChild(el("p", "muted", x.details));
      g.appendChild(item);
    });
  }

  function reveals() {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px 60px 0px", threshold: 0.04 });
    document.querySelectorAll(".section:not(.hero) > .container").forEach(function (section) {
      if (section.getBoundingClientRect().top < window.innerHeight) return;
      observer.observe(section);
      section.classList.add("reveal-pending");
    });
  }

  function renderCerts() {
    var g = document.getElementById("certList");
    D.certifications.filter(function (x) { return x.verified; }).forEach(function (x) {
      var c = el("article", "card cert");
      c.appendChild(el("h3", "card__title", x.title));
      c.appendChild(el("p", "muted", x.org));
      if (x.date) c.appendChild(el("p", "mono", x.date));
      if (x.link) c.appendChild(link(x.link, "View credential →", "text-link"));
      g.appendChild(c);
    });
  }

  function nav() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    }
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });

    var links = menu.querySelectorAll('ul a[href^="#"]');
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && map[en.target.id]) {
            links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
            map[en.target.id].classList.add("is-active");
            map[en.target.id].setAttribute("aria-current", "true");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  function smoothScroll() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      var navH = document.querySelector(".nav").offsetHeight;
      var start = window.pageYOffset;
      var end = target.getBoundingClientRect().top + start - navH - 8;
      history.pushState(null, "", "#" + id);
      if (reduce) { window.scrollTo(0, end); return; }
      var dur = Math.min(900, 300 + Math.abs(end - start) * 0.25), t0 = null;
      function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        window.scrollTo(0, start + (end - start) * ease(p));
        if (p < 1) requestAnimationFrame(step); else { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
      }
      requestAnimationFrame(step);
    });
  }

  smoothScroll(); renderSkills(); renderProjects(); renderExperience(); renderEducation(); renderCerts(); nav(); reveals();
})();
