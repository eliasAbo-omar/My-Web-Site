type s = string;
type n = number;

// ========== Header's Menu & class Active ===========
const headContainer = document.querySelector(".head-container") as HTMLElement;
const menu = document.querySelector(".menu") as HTMLElement;
const singUp = document.querySelector(".singUp") as HTMLElement;
const fargment = document.createDocumentFragment() as DocumentFragment;

const list: s[] = [
  "Home",
  "About Us",
  "Our Services",
  "Portfolio",
  "Contact Us",
];

console.log(singUp);

if (!headContainer || !menu || list.length === 0) {
  throw new Error("Element Not Found");
} else {
  list.forEach((item: s, index: n) => {
    const li = document.createElement("li") as HTMLLIElement;
    const a = document.createElement("a") as HTMLAnchorElement;

    a.href = `#${item.toLowerCase()}`;
    a.textContent = item;

    if (index === 0) {
      a.classList.add("active");
    }

    li.appendChild(a);
    fargment.appendChild(li);
    menu.appendChild(fargment);
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
