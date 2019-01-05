# IGUANA vs SNAKES

## GA Project 1
This was the first project during my time on the Web Development Immersive course (12 weeks of full-time) at General Assembly. The project took place in the week 4. [>>Play here<<](https://jumee-ldn.github.io/wdi-project-one/)

**Note**
- The app is not yet fully responsive. For best experience open on the laptop.
- The landing page may take longer than the average page load time.

#### Course Curriculum :

> **Week 1-3** | Module One

- HTML5
- CSS3 and Animation
- Sass
- JavaScript
- jQuery

*Full curriculum available at the bottom of the page.*

***

## Brief
Design a grid-based game that works in the user's browser. Players must be able to win and lose. The game should be built using HTML5, CSS3, and Javascript (jQuery).</br>
**Timeframe :** 1 week (October 2018)

## Concept
Inspired by BBC television series Planet Earth, I built a grid-based game which requires players to use the arrow keys to save baby iguanas from hungry snakes.

## Goal
Build an initial make-believe BBC game site which could develop further as a whole series of nature documentary inspired games.

## Visuals
parallax.js used.

```javascript

<div id="youtube" class="parallax-window" data-parallax="scroll">
  <div class="videoContainer">
    <iframe class="videoContainer__video" width="1920" height="1080" src="https://www.youtube.com/embed/Rv9hn4IGofM?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen frameborder="0"></iframe>
  </div>
</div>
```

![screenshots](screenshots/IvS-start.gif
)

## The Game
Save iguanas as many as possible. The score goes up every time when an iguana is on a rocky line at the top and the number goes down when the iguana meets snakes. The game ends when the score goes under 0.

![screenshots](screenshots/IvS.gif
)

## Project Log
#### Approach
| Time    | Action                                              |
| ------- |:---------------------------------------------------:|
| Day 1   | Project concept, wireframe and code planning        |
| Day 2   | Create `gridGenerator(15,20);` and iguana in control|
| Day 3   | Generate random snakes and set clash condition      |
| Day 4   | Set a boundary for iguana and display score         |
| Day 5   | Style and animation                                 |
| Day 6   | Refactoring, bug fixing and deployment              |
| Day 7   | Presentation                                        |

#### Challenges
It was challenging to automate the snakes to move along the grid to the end point while keeping the form of its head and tail.
```javascript

function moveSnakes() {
  $('.snake').removeClass('snake');
  snakeArr.forEach(snake => {
    if (snake.direction === 'right') {
      const snakePositions = snake.positions;
      const head = snakePositions[snakePositions.length - 1];
      snakePositions.push(head + 1);
      snakePositions.splice(0, 1);
      let randomSnakeLenght = Math.floor(Math.random() * 7 + 2);
      if (snakePositions.length < randomSnakeLenght - 2) {
        const tail = snakePositions[0];
        snakePositions.unshift(tail - 1);
      }
    }
    snake.positions.forEach(snakePiece => {
      $(`#${snakePiece}`).addClass('snake');
    });
  });
}
```
#### Lessons learned
- Are plans made to be broken? Replan and reschedule the project more than once.
- Simultaneous refactoring is better.

## Bugs / Moving Forward
No game over. The score goes down to minus.

## Technologies Used

* Javascript (ECMAScript6)
* jQuery
* HTML5
* CSS3 & CSS Animation
* GitHub

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**

***

## Course Curriculum
Please see below for the details of my training and links to more projects.

> **Week 1-3** | Module One

- HTML5
- CSS3 and CSS Animation
- Sass
- JavaScript
- jQuery

> **Week 4**

- *Project 1* : **Iguana vs Snakes** | [GitHub](https://github.com/Jumee-LDN/wdi-project-one) |
[Play Link](https://jumee-ldn.github.io/wdi-project-one/)

> **Week 5** | Module Two

- Node.js
- Express.js
- EJS
- MongoDB
- User Authentication

> **Week 6**

- *Project 2* : **hungry korilla** | [GitHub](https://github.com/Jumee-LDN/wdi-project-two) |
[Heroku](https://hungrykorilla.herokuapp.com/)

> **Week 7-8** | Module Three

- Angular
- Token Authentication & Session Authentication
- Third-party APIs
- Mocha and Chai

> **Week 9**

- *Project 3* : **xhibit** | [GitHub](https://github.com/Jumee-LDN/wdi-project-3) |
[Heroku](https://xhibit.herokuapp.com/#!/)

> **Week 10-11** | Module Four

- React
- JSX
- ES6

> **Week 12**

- *Project 4* : **Nomad** | [GitHub](https://github.com/Jumee-LDN/wdi-project-four) |
[Heroku](https://nomad-ga.herokuapp.com/)

***

## Contact
#### Jumee Lee
Email : jumeelee.london@gmail.com

[Portfolio](https://jumeelee.co.uk/) | [LinkedIn](https://www.linkedin.com/in/jumeelee/) | [GitHub](https://github.com/Jumee-LDN)
