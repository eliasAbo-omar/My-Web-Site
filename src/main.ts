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

fetchProjects().then((projects: myProject[]) => {
  projects.forEach((project: myProject) => {
    const card = document.createElement("div") as HTMLDivElement;
    const title = document.createElement("h3") as HTMLHeadingElement;
    const description = document.createElement("p") as HTMLParagraphElement;
    const link = document.createElement("a") as HTMLAnchorElement;
    const image = document.createElement("img") as HTMLImageElement;
    const regex = /(-|_)/gi;
    const upperCase: s =
      project.name.charAt(0).toUpperCase() + project.name.slice(1);
    const lowerCase: s = project.name.toLowerCase();

    console.log(upperCase);
    console.log(lowerCase);

    image.src = `../image/${lowerCase.replace(regex, " ")}.png`;
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
  projectContainer?.appendChild(fragment);
});

// ========== Footer Section ===========

const footerYear = document.querySelector(".footer p span") as HTMLSpanElement;

const currentYear: n = new Date().getFullYear();

footerYear.textContent = currentYear.toString();
