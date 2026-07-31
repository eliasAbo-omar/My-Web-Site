type s = string;

const headContainer = document.querySelector(".head-container") as HTMLElement;
const menu = document.querySelectorAll(".menu") as NodeListOf<HTMLElement>;

const list: s[] = ["Home", "About", "Contact", "Blog", "Services"];

const firstMenu = menu[0] as HTMLElement;

if (!headContainer || !firstMenu || list.length === 0) {
  throw new Error("Element Not Found");
} else {
  list.forEach((item: s) => {
    const li = document.createElement("li") as HTMLLIElement;
    const a = document.createElement("a") as HTMLAnchorElement;

    a.href = `#${item}`;
    a.textContent = item;

    li.appendChild(a);
    firstMenu.appendChild(li);

    headContainer.appendChild(firstMenu);
  });
}
