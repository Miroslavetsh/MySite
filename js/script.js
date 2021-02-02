// Classes of components

class Component {
    constructor(elementName) {
        this.html
        this.selector = `#${elementName}`
        this.component
    }

    setComponent() {
        this.component = document.querySelector(this.selector)
    }

    // get component() {
    //     return this.component
    // }

    create() {
        return this.html
    }


    activate() {
        this.component.classList.add('_active')
    }

    disactivate() {
        this.component.classList.remove('_active')
    }

    isActive() {
        return this.component.classList.contains('_active')
    }

    fixate() {
        this.component.classList.add('_fixed')
    }

    unfix() {
        this.component.classList.remove('_fixed')
    }
}

class Header extends Component {

    constructor (elementName) {
        super(elementName)
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
        this.ANIMATION_DURATION = 200
    }

    animate(options) {
        this.component.animate(options, this.ANIMATION_DURATION)
    }
}

class Burger extends Component {
    constructor(elementName) {
        super(elementName)
        this.html = `
            <div class="header__burger burger" id="burger">
                <span></span>
            </div>
        `
    }
}

class Navigation extends Component {
    constructor(elementName) {
        super(elementName)
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
    }
}


// main components 

const headerObj = new Header('header')
const burgerObj = new Burger('burger')
const navigationObj = new Navigation('nav')


// The main function that allow us to create all of the components

function render() {
    document.addEventListener('DOMContentLoaded', () => {
        const wrapper = document.querySelector('#page')
        wrapper.insertAdjacentHTML('afterbegin', headerObj.create())
        headerObj.setComponent()

        // Init the navigation
        const header__inner = document.querySelector('.header__inner')
        header__inner.insertAdjacentHTML('beforeend', navigationObj.create())
        navigationObj.setComponent()
        // Added new method that show us a state
        navigationObj.isActive = function() {
            return navigation.classList.contains('_active')
        }

        //  Init the burger
        header__inner.insertAdjacentHTML('afterbegin', burgerObj.create())
        burgerObj.setComponent()
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

            headerObj.setComponent()
            
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