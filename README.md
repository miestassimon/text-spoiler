# Text Spoiler

Hides a text part with a spoiler button.

__Use careful! The script needs to be tested.__

## Usage

How to use this script.

### 1. Add a `data-text-spoiler` attribute to a node. The attribute value sets up how many lines should be visible in collapsed state.

```html
<div class="text" data-text-spoiler="4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus aperiam architecto assumenda commodi, dolorum ea earum eius eveniet excepturi exercitationem itaque necessitatibus officiis quia quisquam, sed sint sit, voluptatibus?</div>
```

### 2. Initiate a script

```js
// In general
new TextSpoiler(selector, lines);


// Will be apply to all nodes contains a data-text-spoiler attribute
new TextSpoiler();


// Will be apply to all nodes with class textblock and it'll be show 4 lines in collapsed state
new TextSpoiler('.textblock', 4);
```