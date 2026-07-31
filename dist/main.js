const sd = null;
console.log(sd);
const headContainer = document.querySelector(".head-container");
const menu = document.querySelectorAll(".menu");
const list = ["Home", "About", "Contact", "Blog", "Services"];
const firstMenu = menu[0];
if (!headContainer || !firstMenu || list.length === 0) {
    throw new Error("Element Not Found");
}
else {
    list.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${item}`;
        a.textContent = item;
        li.appendChild(a);
        firstMenu.appendChild(li);
        headContainer.appendChild(firstMenu);
    });
}
export {};
//# sourceMappingURL=main.js.map