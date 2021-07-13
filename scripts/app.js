/* 
    1. create game object
    - colors: array
    - age: 0
    - round: 1
    - battery: 100
    - stimulation: 0
    - modifications: 0
 */

const friendroid = {
    colors: ['gray', 'blue', 'red'],
    age: 0,
    round: 1,
    battery: 100,
    stimulation: 0,
    modifications: 0,
    start(event) {
        console.log('package opened');
    },
}

/* 
    2. event listener on button to begin game
    - select ".open-package" from the dom
    - add event listener "click"
    - create a start method in friendroid object that the event listener will call
*/

$(".open-package").on("click", friendroid.start);