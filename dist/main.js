const headContainer = document.querySelector(".head-container");
const menu = document.querySelectorAll(".menu");
const list = ["Home", "About", "Contact", "Blog", "Services"];
const firstMenu = menu[0];
if (!headContainer || !firstMenu || list.length === 0) {
    throw new Error("Element Not Found");
}
else {
    list.forEach((item, index) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
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
const myAllLinks = document.querySelectorAll(".menu a");
myAllLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        myAllLinks.forEach((a) => {
            a.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});
export {};
//# sourceMappingURL=main.js.map