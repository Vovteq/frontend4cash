const parallaxObj = document.getElementsByClassName("parallax-object");
const parallaxArr = Array();
let scrollY = 0;

for (let item of parallaxObj) {
    parallaxArr.push({
        speed: item.getAttribute("parallax-speed"),
        z: item.getAttribute("parallax-z"),
        base: item.getAttribute("parallax-base"),
        elem: item
    })
}

window.addEventListener("scroll", function () {
   scrollY = window.scrollY;

   for (let obj of parallaxArr) {
       obj.elem.style.transform = "translate3d(0," + scrollY * obj.speed + "px, 0)";
   }
});
