# Deck'em: Jade + deck.js Awesomeness 

First, lets establish why this project exists:

1. [deck.js](https://github.com/imakewebthings/deck.js) is a wonderful library for creating web presentations.  Does just enough, and has plugin support.  Brilliant.

2. The [Jade templating engine](https://github.com/visionmedia/jade) is very expressive and is likely to save you from typing html tags again and again and, um, again.

3. The two combined with some tooling would be awesome.

__NOTE:__ Deckem uses a [modified version of deck.js](https://github.com/DamonOehlman/deck.js) which removes a lot of the iframe hacks that have been implemented to improve the behaviour of video embedded in slides.  This has been done as deckem is designed to be a coders presentation tool and iframes are used to embed demos that have been built with [demogen](https://github.com/DamonOehlman/demogen).

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

- index.html (The compiled deck)
- deckem.css (A collection of [CSS files](/DamonOehlman/deckem/blob/master/src/deckem.css) required to make the deck look pretty)
- deckem.js (A collection of [JavaScript files](https://github.com/DamonOehlman/deckem/blob/master/src/deckem.js) require to make the deck work)

## Advanced Usage

### Configuration Files

In addition to the main `deck.jade` file, you might have also noticed that a scaffolded presentation also contains a `deck.json` file.  This file allows you to configure aspects of the deck.

```js
{
	"title": "Your Deck Title",
	"theme": "neon"
}
```

### Building a Suite of Decks

In short, run the `deckem` from a directory in which you have subfolders with decks in them.  It will build them all for you and put the client assets in the root folder only.  

Deck configurations are inherited from parent folders down into subfolders, so you can specify a theme in a top level folder and have all child decks use that them while using the configuration file to set the presentation title.

## License

MIT

## Roadmap

- Include options in the build process to change deck.js themes, etc
- Read configuration information from a local config file and include deck.js extensions appropriately.