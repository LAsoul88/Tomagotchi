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
    age: 0,
    round: 1,
    battery: 100,
    stimulation: 0,
    modifications: 50, // NOTE change back to 0 for regular functionality or 50 for easier/debug mode

    typing() {
        $('.typed-sentence').eq(0).addClass('typewriter');
        $('.typed-sentence').eq(0).css('display', 'block').removeClass('typed-sentence');
    },
    
    instructions(event) {
        $('.instructions').css('visibility', 'hidden');
        frienDroid.typing()
        setInterval(frienDroid.typing, 2500);
    },

    openPackage(event) {
        $('.instructions, .typed-sentence, .typewriter').css('display', 'none');
        $('.robot').addClass('robot1');
        frienDroid.hide();
        frienDroid.nameReveal();
    },
    
    start(event) {
        $('.title').text(`${$('.name').val()}`)
        frienDroid.nameHide();
        frienDroid.reveal();
        frienDroid.startAging();
        $('.robot').addClass('robot-glow');
    },
    
    nameReveal() {
        $('.name-visible').css('visibility', 'visible');
    },

    nameHide() {
        $('.disappear').css('display', 'none');
    },

    reveal() {
        $('.visible').css('visibility', 'visible');
    },
    
    hide() {
        $('.invisible').css('visibility', 'hidden');
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
        frienDroid.battery -= 5;
        frienDroid.stimulation += 3;
        frienDroid.updateMeters();
    },

    metersRunningTwo() {
        frienDroid.battery -= 6;
        frienDroid.stimulation += 4;
        frienDroid.updateMeters();
    },

    metersRunningThree() {
        frienDroid.battery -= 7;
        frienDroid.stimulation += 5;
        frienDroid.updateMeters();
    },
    
    resetMeters() {
        frienDroid.battery = 100;
        frienDroid.stimulation = 0;
        frienDroid.modifications = 50; // NOTE change back to 0 for regular functionality or 50 for easier/debug mode
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
        if (frienDroid.battery <= 0 || frienDroid.stimulation >= 100) {
            $('.button').prop('disabled', true);
        } else {
            $('.button').prop('disabled', true);
            setTimeout(frienDroid.buttonEnable, 2000);
        }
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

    updateRobot() {
        frienDroid.round++;
        $('.current-form').text(`Form: ${frienDroid.round}`);
        $('.robot').addClass(`robot${frienDroid.round}`);

    },
    
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
                frienDroid.buttonDisable();
                clearInterval(frienDroid.timer);
                frienDroid.gameOver();
            } else if (frienDroid.modifications >= 100) {
                frienDroid.updateRobot();
                frienDroid.resetMeters();
                frienDroid.updateMeters();
            }
        } else if (frienDroid.round === 2) {
            frienDroid.metersRunningTwo();
            if (frienDroid.battery <= 0 || frienDroid.stimulation >= 100) {
                frienDroid.buttonDisable();
                clearInterval(frienDroid.timer);
                frienDroid.gameOver();
            } else if (frienDroid.modifications >= 100) {
                frienDroid.updateRobot();
                frienDroid.resetMeters();
                frienDroid.updateMeters();
            }
        } else {
            frienDroid.metersRunningThree();
            if (frienDroid.battery <= 0 || frienDroid.stimulation >= 100) {
                frienDroid.buttonDisable();
                clearInterval(frienDroid.timer);
                frienDroid.gameOver();
            } else if (frienDroid.modifications >= 100) {
                frienDroid.updateRobot();
                $('.button').prop('disabled', true);
                clearInterval(frienDroid.timer);
                frienDroid.gameOver();
            }    
        }  
    },
    gameOver() {
        $('.meter').css('visibility', 'hidden');
        $('.button').css('visibility', 'hidden');
        if (frienDroid.round === 4) {
            $('.current-form').text('Congrats, you finished your frienDroid! Good thing this one is your friend...').css('font-size', '20px');
        } else if (frienDroid.battery <= 0) {
            $('.current-form').text('Oh no, the battery ran out!').css('font-size', '20px');
            $('.robot').css('box-shadow', 'none');
            $('.robot').removeClass('robot-glow');
        } else {
            $('.current-form').text('Oh no, it became self-aware too quickly and burnt out!').css('font-size', '20px');
            $('.robot').addClass('spinning');
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


$(".instructions").on("click", frienDroid.instructions);
$(".open-package").on("click", frienDroid.openPackage);
$(".name-button").on("click", frienDroid.start);
$("#change-batteries").on("click", frienDroid.batteryFill);
$("#moderate-internet").on("click", frienDroid.stimulationDrain);
$("#attach-parts").on("click", frienDroid.modificationFill);