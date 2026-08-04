type s = string;
type n = number;

// ========== Header's Menu & class Active ===========
const headContainer = document.querySelector(".head-container") as HTMLElement;
const menu = document.querySelector(".menu") as HTMLElement;
const fargment = document.createDocumentFragment() as DocumentFragment;

const list: s[] = ["Home", "Projects", "About-Me", "Contact-Me"];

if (!headContainer || !menu || list.length === 0) {
  throw new Error("Element Not Found");
} else {
  list.forEach((item: s, index: n) => {
    const li = document.createElement("li") as HTMLLIElement;
    const a = document.createElement("a") as HTMLAnchorElement;

    const reg = /-/gi;

    a.href = `#${item.toLowerCase()}`;
    a.textContent = item.replace(reg, " ");

    if (index === 0) {
      a.classList.add("active");
    }

    li.appendChild(a);
    fargment.appendChild(li);
  });
  menu.appendChild(fargment);
}

const myAllLinks = document.querySelectorAll(
  ".menu a",
) as NodeListOf<HTMLAnchorElement>;

myAllLinks.forEach((link: HTMLAnchorElement) => {
  link.addEventListener("click", (e: PointerEvent) => {
    myAllLinks.forEach((a: HTMLAnchorElement) => {
      a.classList.remove("active");
    });
    (e.target as HTMLAnchorElement).classList.add("active");
  });
});

// ========== Projects Section ===========

const fragment = document.createDocumentFragment() as DocumentFragment;
const projectContainer = document.querySelector(
  ".container-projects",
) as HTMLDivElement;

interface Project {
  name: s;
  description: s;
  html_url: s;
}

class myProject {
  name: s;
  description: s;
  url?: s;

  constructor(name: s, description: s, url?: s) {
    this.name = name || "Untitled Project";
    this.description = description || "No description provided.";
    this.url = url || "#";
  }
}

async function fetchProjects(): Promise<myProject[]> {
  try {
    const res = await fetch("https://api.github.com/users/eliasAbo-omar/repos");
    const data = await res.json();
    return data.map(
      (repo: Project) =>
        new myProject(repo.name, repo.description, repo.html_url),
    );
  } catch (error) {
    console.error("Failed to fetch projects: " + error);
    return [];
  }
}

function closeAllCard(): void {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.classList.remove("long", "special");
  });
  document.querySelectorAll(".text-description").forEach((text) => {
    text.classList.remove("height");
  });
}

fetchProjects().then((projects: myProject[]) => {
  projects.forEach((project: myProject) => {
    const card = document.createElement("div") as HTMLDivElement;
    const title = document.createElement("h3") as HTMLHeadingElement;
    const textDescription = document.createElement("div") as HTMLDivElement;
    const linkDiv = document.createElement("div") as HTMLDivElement;
    const ditals = document.createElement("button") as HTMLButtonElement;
    const description = document.createElement("p") as HTMLParagraphElement;
    const link = document.createElement("a") as HTMLAnchorElement;
    const image = document.createElement("img") as HTMLImageElement;
    const regex = /(-|_|\s)/gi;
    const upperCase: s =
      project.name.charAt(0).toUpperCase() + project.name.slice(1);
    const lowerCase: s = project.name.toLowerCase();

    card.dataset.projectName = project.name;

    image.src = `./image/${lowerCase}.png`;
    image.alt = "Logo";
    image.classList.add("project-img");

    title.textContent = upperCase.replace(regex, " ");
    description.textContent = project.description;

    link.href = `${project.url}`;
    link.classList.add("link-project");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View Project";

    ditals.textContent = "Details";
    ditals.classList.add("details");

    card.classList.add("project-card");
    textDescription.classList.add("text-description");
    linkDiv.classList.add("project-link");

    textDescription.appendChild(description);
    linkDiv.appendChild(link);
    linkDiv.appendChild(ditals);

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(textDescription);
    card.appendChild(linkDiv);

    fragment.appendChild(card);
  });
  projectContainer?.appendChild(fragment);

  setTimeout(() => {
    sr.reveal(`.project-card`, {
      interval: 100,
      origin: "bottom",
    });
  });
});

projectContainer?.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  const detailsBtn = target.closest(".details") as HTMLButtonElement;
  const card = target.closest(".project-card") as HTMLDivElement;

  if (detailsBtn && card) {
    e.stopPropagation();

    const isOpen =
      card.classList.contains("long") || card.classList.contains("special");
    const textDescription = card.querySelector(
      ".text-description",
    ) as HTMLDivElement;
    const projectName = card.dataset.projectName as s;

    closeAllCard();

    if (!isOpen) {
      if (projectName === "My-Web-Site") {
        card.classList.add("special");
      } else {
        card.classList.add("long");
      }
      textDescription.classList.add("height");
    }
    return;
  }

  if (card && !detailsBtn) {
    closeAllCard();
  }
});

document.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest(".details")) {
    closeAllCard();
  }
});

// ========== conatact Section ===========
const inputName = document.getElementById("userName") as HTMLInputElement;
const inputEmail = document.getElementById("userEmail") as HTMLInputElement;
const inputSubject = document.getElementById("userSubject") as HTMLInputElement;
const inputMessage = document.getElementById("userMessage") as HTMLInputElement;
const contactForm = document.querySelector(".contact-form") as HTMLFormElement;

function textProtection(text: s): s {
  return text
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/&/g, "&amp;")
    .replace(/\\/g, "&#92;")
    .replace(/\//g, "&#47;");
}

contactForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const nameValue: s = inputName.value.trim();
  const emailValue: s = inputEmail.value.trim();
  const subjectValue: s = inputSubject.value.trim();
  const messageValue: s = inputMessage.value.trim();

  if (!nameValue || !emailValue || !subjectValue || !messageValue) return;

  const clearValueName: s = textProtection(nameValue);
  const clearValueEmail: s = textProtection(emailValue);
  const clearValueSubject: s = textProtection(subjectValue);
  const clearValueMessage: s = textProtection(messageValue);

  const myEmail: s = "ekasa123@gmail.com";

  const emailBody: s = `Hello, I am ${clearValueName}.\n\n${clearValueMessage}\n\nMy contact email: ${clearValueEmail}`;

  const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${encodeURIComponent(clearValueSubject)}&body=${encodeURIComponent(emailBody)}`;

  window.open(mailtoUrl, "_blank");
});

// ========== Place Holder in contact Section ===========
const placeHolder = document.querySelectorAll(
  "input",
) as NodeListOf<HTMLInputElement>;

const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
const textareaPlaceHolder = textarea.placeholder;
const textareaLetters = textareaPlaceHolder.split("");

let time: n[] = [];
let textareTime: n[] = [];

placeHolder.forEach((input: HTMLInputElement) => {
  const text: s = input.placeholder;

  const allLetter: s[] = text.split("");

  input.addEventListener("focus", () => {
    input.placeholder = "";

    allLetter.forEach((letters: s, i: n) => {
      const t = setTimeout(() => {
        input.placeholder += letters;
      }, 100 * i);

      time.push(t);
    });
  });

  input.addEventListener("blur", () => {
    input.placeholder = text;
    time.forEach((t: n) => clearTimeout(t));
    time = [];
  });
});

textarea.addEventListener("focus", () => {
  textarea.placeholder = "";
  textareaLetters.forEach((letter: s, i: n) => {
    const t = setTimeout(() => {
      textarea.placeholder += letter;
    }, 100 * i);

    textareTime.push(t);
  });
});

textarea.addEventListener("blur", () => {
  textarea.placeholder = textareaPlaceHolder;
  textareTime.forEach((t: n) => clearTimeout(t));
  textareTime = [];
});

// ========== Footer Section ===========

const footerYear = document.querySelector(".footer p span") as HTMLSpanElement;

const currentYear: n = new Date().getFullYear();

footerYear.textContent = currentYear.toString();

// ========== active class on nav auto ===========

const navLinks = document.querySelectorAll(
  ".menu li a",
) as NodeListOf<HTMLAnchorElement>;

window.addEventListener("scroll", () => {
  const scrollY: n = window.scrollY;

  navLinks.forEach((link: HTMLAnchorElement) => {
    const hash = link.hash;

    const section = document.querySelector(hash) as HTMLElement;

    if (section) {
      const sectionTop: n = section.offsetTop - 100;
      const sectionHeight: n = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
});

// ========== active menu on click icon ==========
const iconMenu = document.querySelector(".icon") as HTMLElement;
const menuActive = document.querySelector(".menu") as HTMLElement;

iconMenu.addEventListener("click", (e: PointerEvent) => {
  e.stopPropagation();
  menuActive.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (
    e.target !== menuActive.closest(".menu") &&
    e.target !== iconMenu.closest(".icon")
  ) {
    menuActive.classList.remove("active");
  }
});

// ========== ScrollReveal animation ==========
declare const ScrollReveal: any;

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 100,
  // reset: true, // animation repeat
});

sr.reveal(`.header`, {
  interval: 100,
});

sr.reveal(`.head-section`, {
  interval: 100,
});

sr.reveal(`.welcome, .text-about, .contact-form`, {
  origin: "left",
  interval: 100,
});

sr.reveal(`.home-img img, .skill, .social-link`, {
  origin: "right",
  interval: 100,
});

sr.reveal(`.my-skill li, .social-link li`, {
  interval: 100,
  delay: 800,
  origin: "right",
});
