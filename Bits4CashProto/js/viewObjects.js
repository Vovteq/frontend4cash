const viewObjects = document.getElementsByClassName("view-object");

window.addEventListener("scroll", function () {
   for (let elem of viewObjects) {
       console.log(elem.className + " is visible: " + isScrolledIntoView(elem));
   }
});

function isScrolledIntoView(elem)
{
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();

    const elemTop = $(elem).offset().top;
    const elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

