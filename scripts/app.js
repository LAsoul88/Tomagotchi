/* 
    1. create game object - done
    - colors: array
    - age: 0
    - round: 1
    - battery: 100
    - stimulation: 0
    - modifications: 0
 */

const frienDroid = {
    colors: ['gray', 'blue', 'red'],
    age: 0,
    round: 1,
    battery: 100,
    stimulation: 0,
    modifications: 0,
    start(event) {
        $('.box').addClass('robot-head').removeClass('box');
        frienDroid.startAging();
        frienDroid.reveal();
        frienDroid.hide();
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

    updateMeters() {
        $('#battery').text(`Battery: ${frienDroid.battery}%`);
        $('#stimulation').text(`Stimulation: ${frienDroid.stimulation}%`);
        $('#modifications').text(`Modifications: ${frienDroid.modifications}%`);
        },

    metersRunningOne() {
        frienDroid.battery -= 4;
        frienDroid.stimulation += 3;
        frienDroid.updateMeters();
    },

    metersRunningTwo() {
        frienDroid.battery -= 6;
        frienDroid.stimulation += 5;
        frienDroid.updateMeters();
    },

    metersRunningThree() {
        frienDroid.battery -= 8;
        frienDroid.stimulation += 7;
        frienDroid.updateMeters();
    },
    
    /* 
    6. methods for resepective buttons to fill battery, reduce stimulation, and fill modifications
    - add method that fills battery by up to 50% (not over 100%) when pressed - done
    - add method that drains stimulation by up to 40% (not under 0%) when pressed - done
    - add method that fills modifications by up to 35% (not over 100%) when pressed - done
    - whenever a button is pressed, all buttons must be disabled for 2 seconds - done
    */     

    batteryFill(event) {
        if (frienDroid.round === 1) {
            frienDroid.battery += 50;
            if (frienDroid.battery > 100) {
                frienDroid.battery = 100;
            }    
            $('#battery').text(`Battery: ${frienDroid.battery}%`);
            frienDroid.buttonDisable();
        } else if (frienDroid.round === 2) {
            frienDroid.battery += 40;
            if (frienDroid.battery > 100) {
                frienDroid.battery = 100;
            }    
            $('#battery').text(`Battery: ${frienDroid.battery}%`);
            frienDroid.buttonDisable();
        } else {
            frienDroid.battery += 35;
            if (frienDroid.battery > 100) {
                frienDroid.battery = 100;
            }    
            $('#battery').text(`Battery: ${frienDroid.battery}%`);
            frienDroid.buttonDisable();
        }
    },    

    stimulationDrain(event) {
        if (frienDroid.round === 1) {
            frienDroid.stimulation -= 40;
            if (frienDroid.stimulation < 0) {
                frienDroid.stimulation = 0;
            }    
            $('#stimulation').text(`Stimulation: ${frienDroid.stimulation}%`);
            frienDroid.buttonDisable();
        } else if (frienDroid.round === 2) {
            frienDroid.stimulation -= 30;
            if (frienDroid.stimulation < 0) {
                frienDroid.stimulation = 0;
            }    
            $('#stimulation').text(`Stimulation: ${frienDroid.stimulation}%`);
            frienDroid.buttonDisable();
        } else {
            frienDroid.stimulation -= 25;
            if (frienDroid.stimulation < 0) {
                frienDroid.stimulation = 0;
            }    
            $('#stimulation').text(`Stimulation: ${frienDroid.stimulation}%`);
            frienDroid.buttonDisable();
        }
    },    

    modificationFill(event) {
        frienDroid.modifications += 10;
        if (frienDroid.modifications > 100) {
            frienDroid.modifications = 100;
        }
        $('#modifications').text(`Modifications: ${frienDroid.modifications}%`);
        frienDroid.buttonDisable();
    },    
    
    buttonEnable() {
        $('.button').prop('disabled', false);
        
    },    
    
    buttonDisable() {
        $('.button').prop('disabled', true);
        setTimeout(frienDroid.buttonEnable, 2000);
    },    
    
    /* 
    7. create failure condition -> game ends if battery = 0% or stimulation = 100% - done
    */
    
    timer: null,

    /* 
    4. create timer - keeps track of age
    - create method that starts the age timer
    -- create method aging()
    --for each second it will add one second to the text in time tag    
   */
    
    startAging() {
        $('.current-form').text(`Form: ${frienDroid.round}`);
        frienDroid.timer = setInterval(frienDroid.aging, 1000);
    },
    
    aging() {
        frienDroid.age++;
        $('time').text(`Age: ${frienDroid.age}s old`);
        if (frienDroid.round === 1) {
            frienDroid.metersRunningOne();
            if (frienDroid.battery <= 0 || frienDroid.stimulation >= 100) {
                clearInterval(frienDroid.timer);
                $('.button').prop('disabled', true);
            } else if (frienDroid.modifications >= 100) {
                frienDroid.round++;
                frienDroid.battery = 100;
                frienDroid.stimulation = 0;
                frienDroid.modifications = 0;
                frienDroid.updateMeters();
            }
        } else if (frienDroid.round === 2) {
            frienDroid.metersRunningTwo();
            if (frienDroid.battery <= 0 || frienDroid.stimulation >= 100) {
                clearInterval(frienDroid.timer);
                $('.button').prop('disabled', true);
            } else if (frienDroid.modifications >= 100) {
                frienDroid.round++;
                frienDroid.battery = 100;
                frienDroid.stimulation = 0;
                frienDroid.modifications = 0;
                frienDroid.updateMeters();
            }
        } else {
            frienDroid.metersRunningThree();
            if (frienDroid.battery <= 0 || frienDroid.stimulation >= 100) {
                clearInterval(frienDroid.timer);
                $('.button').prop('disabled', true);
            } else if (frienDroid.modifications >= 100) {
                frienDroid.round++;
                clearInterval(frienDroid.timer);
            }    
        }  
    },

    reveal() {
        $('.visible').css('visibility', 'visible');
    },
    
    hide() {
        $('.invisible').css('visibility', 'hidden');
    },
};
/* 
    2. event listener on button to begin game
    - select ".open-package" from the dom - done
    - add event listener "click" - done
    - create a start method in friendroid object that the event listener will call -done
    -
*/

$(".open-package").on("click", frienDroid.start);
$("#change-batteries").on("click", frienDroid.batteryFill);
$("#moderate-internet").on("click", frienDroid.stimulationDrain);
$("#attach-parts").on("click", frienDroid.modificationFill);