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
        $('.box').addClass('robot-head').removeClass('box');
        friendroid.startAging();
    },
    /* 
        4. create timer - keeps track of age
        - create method that starts the age timer
            -- create method aging()
            --for each second it will add one second to the text in time tag    
    */
    startAging() {
        this.age = setInterval(this.aging, 1000);
    },
    aging(){
        friendroid.age++;
        console.log(friendroid.age);
        $('time').text(`Age: ${friendroid.age}s old`);

    },
};

/* 
    2. event listener on button to begin game
    - select ".open-package" from the dom - done
    - add event listener "click" - done
    - create a start method in friendroid object that the event listener will call -done
    -
*/

$(".open-package").on("click", friendroid.start);
/* 
    5. create meters -> battery drains over time, stimulation fills over time, modifications fills with user input
    - connect meters to their respective values in friendroid object
    - 
*/