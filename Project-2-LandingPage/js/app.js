/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

//store start time (to calculate execution time)
let startingTime = performance.now();
//contains all elements of class section
const sections = document.querySelectorAll('section');
//used to store the timer
let isScrolling;

//colapse paragraph inside of section
//event contains the element which was clicked
function collapsethis(event) {


    sectionToCollapse = (event.parentElement).querySelector('.collapse');
    let style = sectionToCollapse.getAttribute('style');

    if (null === style || "" === style) {
        sectionToCollapse.setAttribute('style', 'display:none');
    } else {
        sectionToCollapse.setAttribute('style', '');
    }

}

//returns if element is in viewport (40% outside the top and 20% inside)
function isInViewport(sectionToCheck) {

    var margins = sectionToCheck.getBoundingClientRect();
    return (margins.top > -(innerHeight * 0.4) && margins.top < innerHeight * 0.2);
}

//sets the header visibility
function showHeader(value) {

    let header = document.querySelector('header');

    if (value === true) {
        header.setAttribute('style', 'display:');
    } else {
        header.setAttribute('style', 'display:none');
    }
}

//Create anchor to section
function createNavBar() {

    let menuList = document.querySelector('#navbar__list');
    menuList.innerHTML = "";

    for (const s of sections) {
        let sectionId = s.getAttribute('id');
        let linkAnchor = `${s.getAttribute('data-nav')}`;

        var li = document.createElement("LI");
        var t = document.createTextNode(linkAnchor);

        li.addEventListener('click', function () {
            s.scrollIntoView();
        });

        li.appendChild(t);
        menuList.appendChild(li);
    }
}

// Add class 'active' to section when near top of viewport
function addScrollEvent() {
    document.addEventListener('scroll', function () {
        scrollFunction();
        window.clearTimeout(isScrolling);
        showHeader(true);
        isScrolling = setTimeout(() => {
            showHeader(false);
        }, 5000);

        for (var section of sections) {
            if (isInViewport(section)) {
                //Set class to active
                section.classList.add('your-active-class');
            } else {
                // set class to inactive
                section.classList.remove('your-active-class');
            }
        }
    });
}

//hides go to top button if you're on the top and shows it if you're 20px down
function scrollFunction() {

    if (document.documentElement.scrollTop > 20) {
        document.querySelector('#goToTopButton').setAttribute('style', 'display:block');
    } else {
        document.querySelector('#goToTopButton').setAttribute('style', 'display:none');
    }
}

//add even listener to goToTopButton
function setupGoToTopButton() {

    document.querySelector('#goToTopButton').addEventListener('click', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

}

function configurePage() {

    //creates the anchor links to be used with the menu 
    createNavBar();

    //adds the scroll event to the document
    addScrollEvent();

    //Set the navigation bar show/hide timeout
    setTimeout(function () {
        showHeader(false)
    }, 5000);

    //setup go to top button
    setupGoToTopButton();
}

configurePage();

console.log(`Total time in ms ${performance.now()-startingTime}`);