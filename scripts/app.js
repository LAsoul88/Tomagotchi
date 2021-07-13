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
        5. create meters -> battery drains over time, stimulation fills over time, modifications fills with user input
        - assign colors to meters (in css) - done
        - create method that gives a percentage of how full each meter is and adjusts the number in real time - done
            -- battery meter drain should be linked to aging timer - done
            -- stimulation meter fill should be linked to aging timer- done
            -- modifications meter will fill with user input - TODO
        - connect meters to their respective values in friendroid object - done
    */
    batteryDrain() {
        friendroid.battery -= 3;
        $('#battery').text(`Battery: ${friendroid.battery}%`);
    },
    stimulationFill() {
        friendroid.stimulation += 4;
        $('#stimulation').text(`Stimulation: ${friendroid.stimulation}%`);
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
        friendroid.batteryDrain();
        friendroid.stimulationFill();
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