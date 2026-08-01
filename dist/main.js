const headContainer = document.querySelector(".head-container");
const menu = document.querySelector(".menu");
const singUp = document.querySelector(".singUp");
const fargment = document.createDocumentFragment();
const list = [
    "Home",
    "About Us",
    "Our Services",
    "Portfolio",
    "Contact Us",
];
console.log(singUp);
if (!headContainer || !menu || list.length === 0) {
    throw new Error("Element Not Found");
}
else {
    list.forEach((item, index) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
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