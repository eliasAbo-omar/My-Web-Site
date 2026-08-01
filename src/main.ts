type s = string;
type n = number;

// ========== Header's Menu & class Active ===========
const headContainer = document.querySelector(".head-container") as HTMLElement;
const menu = document.querySelectorAll(".menu") as NodeListOf<HTMLElement>;

const list: s[] = ["Home", "About", "Contact", "Blog", "Services"];

const firstMenu = menu[0] as HTMLElement;

if (!headContainer || !firstMenu || list.length === 0) {
  throw new Error("Element Not Found");
} else {
  list.forEach((item: s, index: n) => {
    const li = document.createElement("li") as HTMLLIElement;
    const a = document.createElement("a") as HTMLAnchorElement;

    a.href = `#${item}`;
    a.textContent = item;

    if (index === 0) {
      a.classList.add("active");
    }

    li.appendChild(a);
    firstMenu.appendChild(li);

    headContainer.appendChild(firstMenu);
  });
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
