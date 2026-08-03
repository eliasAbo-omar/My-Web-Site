var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const headContainer = document.querySelector(".head-container");
const menu = document.querySelector(".menu");
const fargment = document.createDocumentFragment();
const list = ["Home", "Projects", "About-Me", "Contact-Me"];
if (!headContainer || !menu || list.length === 0) {
    throw new Error("Element Not Found");
}
else {
    list.forEach((item, index) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
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
const myAllLinks = document.querySelectorAll(".menu a");
myAllLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        myAllLinks.forEach((a) => {
            a.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});
const fragment = document.createDocumentFragment();
const projectContainer = document.querySelector(".container-projects");
class myProject {
    constructor(name, description, url) {
        this.name = name || "Untitled Project";
        this.description = description || "No description provided.";
        this.url = url || "#";
    }
}
function fetchProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("https://api.github.com/users/eliasAbo-omar/repos");
            const data = yield res.json();
            return data.map((repo) => new myProject(repo.name, repo.description, repo.html_url));
        }
        catch (error) {
            console.error("Failed to fetch projects: " + error);
            return [];
        }
    });
}
fetchProjects().then((projects) => {
    projects.forEach((project) => {
        const card = document.createElement("div");
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const link = document.createElement("a");
        const image = document.createElement("img");
        const regex = /(-|_|\s)/gi;
        const upperCase = project.name.charAt(0).toUpperCase() + project.name.slice(1);
        const lowerCase = project.name.toLowerCase();
        image.src = `./image/${lowerCase}.png`;
        image.alt = "Logo";
        image.classList.add("project-img");
        title.textContent = upperCase.replace(regex, " ");
        description.textContent = project.description;
        link.href = `${project.url}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View Project";
        card.classList.add("project-card");
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(link);
        fragment.appendChild(card);
    });
    projectContainer === null || projectContainer === void 0 ? void 0 : projectContainer.appendChild(fragment);
});
const inputName = document.getElementById("userName");
const inputEmail = document.getElementById("userEmail");
const inputSubject = document.getElementById("userSubject");
const inputMessage = document.getElementById("userMessage");
const contactForm = document.querySelector(".contact-form");
function textProtection(text) {
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
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameValue = inputName.value.trim();
    const emailValue = inputEmail.value.trim();
    const subjectValue = inputSubject.value.trim();
    const messageValue = inputMessage.value.trim();
    if (!nameValue || !emailValue || !subjectValue || !messageValue)
        return;
    const clearValueName = textProtection(nameValue);
    const clearValueEmail = textProtection(emailValue);
    const clearValueSubject = textProtection(subjectValue);
    const clearValueMessage = textProtection(messageValue);
    const myEmail = "ekasa123@gmail.com";
    const emailBody = `Hello, I am ${clearValueName}.\n\n${clearValueMessage}\n\nMy contact email: ${clearValueEmail}`;
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${encodeURIComponent(clearValueSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, "_blank");
});
const placeHolder = document.querySelectorAll("input");
const textarea = document.querySelector("textarea");
const textareaPlaceHolder = textarea.placeholder;
const textareaLetters = textareaPlaceHolder.split("");
let time = [];
let textareTime = [];
placeHolder.forEach((input) => {
    const text = input.placeholder;
    const allLetter = text.split("");
    input.addEventListener("focus", () => {
        input.placeholder = "";
        allLetter.forEach((letters, i) => {
            const t = setTimeout(() => {
                input.placeholder += letters;
            }, 100 * i);
            time.push(t);
        });
    });
    input.addEventListener("blur", () => {
        input.placeholder = text;
        time.forEach((t) => clearTimeout(t));
        time = [];
    });
});
textarea.addEventListener("focus", () => {
    textarea.placeholder = "";
    textareaLetters.forEach((letter, i) => {
        const t = setTimeout(() => {
            textarea.placeholder += letter;
        }, 100 * i);
        textareTime.push(t);
    });
});
textarea.addEventListener("blur", () => {
    textarea.placeholder = textareaPlaceHolder;
    textareTime.forEach((t) => clearTimeout(t));
    textareTime = [];
});
const footerYear = document.querySelector(".footer p span");
const currentYear = new Date().getFullYear();
footerYear.textContent = currentYear.toString();
const navLinks = document.querySelectorAll(".menu li a");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    navLinks.forEach((link) => {
        const hash = link.hash;
        const section = document.querySelector(hash);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                link.classList.add("active");
            }
            else {
                link.classList.remove("active");
            }
        }
    });
});
export {};
//# sourceMappingURL=main.js.map