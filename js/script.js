// WEBP format 

function testWebP(callback) {

	var webP = new Image()
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2)
	}
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
};


// Classes of components

class Header {

    constructor () {
        this.html = `
            <header class="header" id="header">
                <div class="container">
    
                    <div class="header__inner">
                        <div class="header__logo logo">
                            <div class="logo__label">MT</div>
                            <a href="#" class="logo__name">Myroslav Toloshnyi</a>
                        </div>
                    </div>        
    
                </div>
            </header>
        `
        this.header
        this.ANIMATION_DURATION = 200
    }
    
    setHeader() {
        this.header = document.querySelector('#header')
    }

    create() {
        return this.html
    }

    getHeader() {
        return this.header
    }

    fixate() {
        this.header.classList.add('_fixed')
    }

    unfix() {
        this.header.classList.remove('_fixed')
    }
    
    animate(options) {
        this.header.animate(options, this.ANIMATION_DURATION)
    }
}

class Burger {
    constructor() {
        this.html = `
            <div class="header__burger burger" id="burger">
                <span></span>
            </div>
        `
        this.burger
    }
    
    create() {
        return this.html
    }

    setBurger() {
        this.burger = document.querySelector('#burger')
    }

    activate() {
        this.burger.classList.add('_active')
    }

    disactivate() {
        this.burger.classList.remove('_active')
    }
}

class Navigation {
    constructor() {
        this.html = `
            <nav class="header__nav nav" id="nav">
                <ul class="nav__wrapper">
                    <li class="nav__item"><a href="#" class="nav__link">Main</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">Slots</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">Author</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">Blog</a></li>
                </ul>
            </nav>
        `
        this.navigation
    }

    setNavigation() {
        this.navigation = document.querySelector('#nav') 
    }

    create() {
        return this.html
    }

    activate() {
        this.navigation.classList.add('_active')
    }

    disactivate() {
        this.navigation.classList.remove('_active')
    }
}


// main components 

const headerObj = new Header
const burgerObj = new Burger
const navigationObj = new Navigation


// The main function that allow us to create all of the components

function render() {
    document.addEventListener('DOMContentLoaded', () => {
        const wrapper = document.querySelector('#page')
        wrapper.insertAdjacentHTML('afterbegin', headerObj.create())
        headerObj.setHeader()

        // Init the navigation
        const header__inner = document.querySelector('.header__inner')
        header__inner.insertAdjacentHTML('beforeend', navigationObj.create())
        navigationObj.setNavigation()
        // Added new method that show us a state
        navigationObj.isActive = function() {
            return navigation.classList.contains('_active')
        }

        //  Init the burger
        header__inner.insertAdjacentHTML('afterbegin', burgerObj.create())
        burgerObj.setBurger()
        burgerObj.isActive = function() {
            return burger.classList.contains('_active')
        }

        burgerhandler()
    })
}


// Listeners (scroll, click, etc) 

function listenToScroll() {
    document.addEventListener('scroll', () => {

        function headerHandler() {
            const preview = document.querySelector('.preview')
                  previewHeight = preview.offsetHeight,
                  scrolledFromTop = getBodyScrollTop()

            headerObj.setHeader()
            
            if (scrolledFromTop > previewHeight) {
                headerObj.fixate()
                headerObj.animate({
                    opacity: [0, 1],
                    transform: ['translateY(-100px)', 'translateY(0)'],
                })
            } else {
                headerObj.animate({
                    opacity: [0, 1],
                    transform: ['translateY(-100px)', 'translateY(0)'],
                })
                headerObj.unfix()
            }
                
        }

        headerHandler()
    })
}


// Handlers for coomponents

function burgerhandler() {
    const body = document.querySelector('body')

    burger.addEventListener('click', () => {
        if (burgerObj.isActive()) { 
            burgerObj.disactivate()
            navigationObj.disactivate()
            body.classList.remove('_fixed')
        } else {
            burgerObj.activate()
            navigationObj.activate()
            body.classList.add('_fixed')
        }
    })
}


// Initiate our application

render()
listenToScroll()


// Main functions to work with defaults parameters 

function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop)
}