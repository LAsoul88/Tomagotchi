/* 
    1. create game object - done
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
    battery: 9, // TODO change back to 100 after clearInterval test
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
            -- modifications meter will fill with user input - done
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
    6. methods for resepective buttons to fill battery, reduce stimulation, and fill modifications
    - add method that fills battery by up to 50% (not over 100%) when pressed - done
    - add method that drains stimulation by up to 40% (not under 0%) when pressed - done
    - add method that fills modifications by up to 35% (not over 100%) when pressed - done
    - whenever a button is pressed, all buttons must be disabled for 2 seconds - done
    */     
   
   batteryFill(event) {
       friendroid.battery += 50;
       if (friendroid.battery > 100) {
           friendroid.battery = 100;
        }    
        $('#battery').text(`Battery: ${friendroid.battery}%`);
        friendroid.buttonDisable();
    },    
    
    stimulationDrain(event) {
        friendroid.stimulation -= 40;
        if (friendroid.stimulation < 0) {
            friendroid.stimulation = 0;
        }    
        $('#stimulation').text(`Stimulation: ${friendroid.stimulation}%`);
        friendroid.buttonDisable();
    },    
    
    modificationFill(event) {
        friendroid.modifications += 35;
        if (friendroid.modifications > 100) {
            friendroid.modifications = 100;
        }    
        $('#modifications').text(`Modifications: ${friendroid.modifications}%`);
        friendroid.buttonDisable();
    },    
    
    buttonEnable() {
        $('.button').prop('disabled', false);
        
    },    
    
    buttonDisable() {
        $('.button').prop('disabled', true);
        setTimeout(friendroid.buttonEnable, 2000);
    },    
    
    /* 
    7. create failure condition -> game ends if battery = 0% or stimulation = 100% 
    */
    
    timer: null,

    /* 
    4. create timer - keeps track of age
    - create method that starts the age timer
    -- create method aging()
    --for each second it will add one second to the text in time tag    
   */
    
    startAging() {
        friendroid.timer = setInterval(friendroid.aging, 1000);
    },
    
    aging() {
        $('time').text(`Age: ${friendroid.age}s old`);
        friendroid.age++;
        friendroid.batteryDrain();
        friendroid.stimulationFill();
        //friendroid.gameOver();
        if (friendroid.battery <= 0 || friendroid.stimulation >= 100) {
            clearInterval(friendroid.timer);
        }    
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
$("#change-batteries").on("click", friendroid.batteryFill);
$("#moderate-internet").on("click", friendroid.stimulationDrain);
$("#attach-parts").on("click", friendroid.modificationFill);