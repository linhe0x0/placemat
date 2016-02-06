# placemat
Some pretty nice placeholder nouns for your site (people, places, and things), powered by https://placem.at/

## Installation

Using [npm](https://www.npmjs.com/):

```
$ npm install -g placemat-node
```

## Usage

```
➜  ~  placemat --help

  Usage: placemat [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -w, --width <n>             Specifies the width of the returned image. Can be used alone, or alongside h. A number in pixels.
    -h, --height <n>            Specifies the height of the returned image. Can be used alone, or alongside w. A number in pixels.
    -r, --random <value>        By default, Placemat will always return the same image for a given size. If you want to mix things up a bit, pass random=1. If you want to get the same "random" image every time, pass any other value for random.
    -t, --text <txt>            Display custom text.
    -c, --textColor <color>     Change the displayed text color.
    -C, --overlayColor <color>  Defines a custom overlay color.
    -b, --overlayBlend <value>  Allows changing the overlay's blend mode.
    -o, --output <FILE>         write images to FILE.

  Commands:

    people <option>

    places <option>

    things <option>
```

## Options

### Width (w)
  
  Specifies the width of the returned image. Can be used alone, or alongside h. A number in pixels.

### Height (h)

  Specifies the height of the returned image. Can be used alone, or alongside w. A number in pixels.

### Random (r)

  By default, Placemat will always return the same image for a given size. If you want to mix things up a bit, pass random=1. If you want to get the same "random" image every time, pass any other value for random, e.g. random=hello or random=2. This tends to be especially handy for the `people` endpoint.

### Text (t)

  Placemat will add your requested dimensions to the returned image by default, but you can bypass that by passing txt=0. If you want to display custom text, just send along something like txt=Hello+World!

### Text Color (c)

  Change the displayed text color. Accepts a 3 (RGB), 4 (ARGB), 6 (RRGGBB), or 8 digit (AARRGGBB) hexadecimal value. The first two digits of an 8 digit hex value represent the color's alpha transparency. Defaults to BFFF.
  
### Overlay Color (C)

  Defines a custom overlay color. Accepts a 3 (RGB), 6 (RRGGBB) or 8 digit (AARRGGBB) hexidecimal value. The first two digits of an 8 digit hex value represent the color's alpha transparency. Defaults to ACACAC.

### Overlay Blend Mode (b)
  Allows changing the overlay's blend mode. Defaults to multiply, and can be assigned to any of the imgix blend modes.
  
### output (o)
  write images to FILE.

Enjoy it.
