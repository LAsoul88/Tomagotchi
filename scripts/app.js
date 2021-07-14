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
        console.log('package opened');
        $('.box').addClass('robot-head').removeClass('box');
        frienDroid.startAging();
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
        },

    batteryDrainOne() {
        frienDroid.battery -= 3;
    },

    batteryDrainTwo() {
        frienDroid.battery -= 5;
    },

    stimulationFillOne() {
        frienDroid.stimulation += 4;
    },

    stimulationFillTwo() {
        frienDroid.stimulation += 6;
    },

    
    /* 
    6. methods for resepective buttons to fill battery, reduce stimulation, and fill modifications
    - add method that fills battery by up to 50% (not over 100%) when pressed - done
    - add method that drains stimulation by up to 40% (not under 0%) when pressed - done
    - add method that fills modifications by up to 35% (not over 100%) when pressed - done
    - whenever a button is pressed, all buttons must be disabled for 2 seconds - done
    */     

    batteryFillOne(event) {
        frienDroid.battery += 50;
        if (frienDroid.battery > 100) {
            frienDroid.battery = 100;
        }    
        $('#battery').text(`Battery: ${frienDroid.battery}%`);
        frienDroid.buttonDisable();
    },    
    
    batteryFillTwo(event) {
        frienDroid.battery += 40;
        if (frienDroid.battery > 100) {
            frienDroid.battery = 100;
        }    
        $('#battery').text(`Battery: ${frienDroid.battery}%`);
        frienDroid.buttonDisable();
    },

    stimulationDrainOne(event) {
        frienDroid.stimulation -= 40;
        if (frienDroid.stimulation < 0) {
            frienDroid.stimulation = 0;
        }    
        $('#stimulation').text(`Stimulation: ${frienDroid.stimulation}%`);
        frienDroid.buttonDisable();
    },    
    
    stimulationDrainTwo(event) {
        frienDroid.stimulation -= 30;
        if (frienDroid.stimulation < 0) {
            frienDroid.stimulation = 0;
        }    
        $('#stimulation').text(`Stimulation: ${frienDroid.stimulation}%`);
        frienDroid.buttonDisable();
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
        frienDroid.timer = setInterval(frienDroid.agingOne, 1000);
    },
    
    agingOne() {
        $('time').text(`Age: ${frienDroid.age}s old`);
        frienDroid.age++;
        frienDroid.batteryDrainOne();
        frienDroid.stimulationFillOne();
        frienDroid.updateMeters();
        if (frienDroid.battery <= 0 || frienDroid.stimulation >= 100) {
            clearInterval(frienDroid.timer);
            $('.button').prop('disabled', true);
        } else if (frienDroid.modifications >= 100) {
            frienDroid.battery = 100;
            $('#battery').text(`Battery: ${frienDroid.battery}%`);
            frienDroid.stimulation = 0;
            $('#stimulation').text(`Stimulation: ${frienDroid.stimulation}%`);
            frienDroid.modifications = 0;
            $('#modifications').text(`Modifications: ${frienDroid.modifications}%`);
            clearInterval(frienDroid.timer);
            $('.button').prop('disabled', true);
            console.log('this is happening');
            frienDroid.resumeAging();
        }   
    },
    
    resumeAging() {
        console.log('this is also happening');
        frienDroid.timer = setInterval(frienDroid.agingTwo, 1000);      
    },
    
    agingTwo() {
        $('time').text(`Age: ${frienDroid.age}s old`);
        frienDroid.age++;
        frienDroid.batteryDrainTwo();
        frienDroid.stimulationFillTwo();
        if (frienDroid.battery <= 0 || frienDroid.stimulation >= 100) {
            clearInterval(frienDroid.timer);
            $('.button').prop('disabled', true);
        } else if (frienDroid.modifications >= 100) {
            frienDroid.modifications = 0;
            clearInterval(frienDroid.timer);
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

$(".open-package").on("click", frienDroid.start);
$("#change-batteries").on("click", frienDroid.batteryFillOne);
$("#moderate-internet").on("click", frienDroid.stimulationDrainOne);
$("#attach-parts").on("click", frienDroid.modificationFill);