# Deck'em: Jade + deck.js Awesomeness 

First, lets establish why this project exists:

1. [deck.js](https://github.com/imakewebthings/deck.js) is a wonderful library for creating web presentations.  Does just enough, and has plugin support.  Brilliant.

2. The [Jade templating engine](https://github.com/visionmedia/jade) is very expressive and is likely to save you from typing html tags again and again and, um, again.

3. The two combined with some tooling would be awesome.

## Getting Started

### Installing Deck'em

First, I'd recommend installing using npm:

```
npm install deckem -g
```

### Scaffolding a new Deck

This will install the helpful `deckem` command-line tool.  You should now be able to scaffold a new deck.  Change to the directory you want to create the deck in and run the following command:

```
deckem create
```

All being well, you'll end up with a new `main.jade` file.  Something similar to the one shown below:

```
.slide
    h1 A Test Slide
    
.slide
    h2 Another Slide
    
    p This a slide with some sub-slides.
    
    ul
        li.slide Like this one
        li.slide And this one
    
.slide
    h2 Some Example Code
    
    textarea.code(mode='javascript',runnable='true')
        console.log('hello');
```

### Building the deck

In the same directory that you scaffolded your deck, run the following command:

```
deckem build
```

After building your deck (note, you can also just run `deckem` as build is the default action), you will have an additional three files in your directory:

- main.html (The compiled deck)
- deckem.css (A collection of [CSS files](/DamonOehlman/deckem/blob/master/src/deckem.css) required to make the deck look pretty)
- deckem.js (A collection of [JavaScript files](https://github.com/DamonOehlman/deckem/blob/master/src/deckem.js) require to make the deck work)

## License

MIT

## Roadmap

- Include options in the build process to change deck.js themes, etc
- Read configuration information from a local config file and include deck.js extensions appropriately.