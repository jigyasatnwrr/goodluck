const canvas = document.getElementById('canvas');
    const colorPicker = document.getElementById('colorPicker');
    const countryInput = document.getElementById('countryInput');
    let selectedColor = '#000';
    let lastFilledBox = null;

    const colors = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#800080', '#000000', 
        '#A52A2A', '#8B0000', '#2E8B57', '#DAA520', '#FF4500', '#1E90FF', '#006600', '#FFCC00'
    ];

    colors.forEach(color => {
        const div = document.createElement('div');
        div.style.backgroundColor = color;
        div.onclick = () => selectedColor = color;
        colorPicker.appendChild(div);
    });

    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.onclick = () => {
            square.style.backgroundColor = selectedColor;
            lastFilledBox = square;
        };
        canvas.appendChild(square);
    }

    function clearLastBox() {
        if (lastFilledBox) {
            lastFilledBox.style.backgroundColor = 'white';
            lastFilledBox = null;
        }
    }

    function predictFlag() {
        const colorsUsed = Array.from(canvas.children).map(box => box.style.backgroundColor).filter(c => c !== 'white');

        if (colorsUsed.includes('rgb(255, 0, 0)') && colorsUsed.includes('rgb(255, 255, 255)')) {
            countryInput.value = 'Canada';
        } else if (colorsUsed.includes('rgb(0, 255, 0)') && colorsUsed.includes('rgb(255, 255, 255)')) {
            countryInput.value = 'Nigeria';
        } else if (colorsUsed.includes('rgb(0, 102, 0)') && colorsUsed.includes('rgb(255, 204, 0)')) {
            countryInput.value = 'Pakistan';
        } else if (colorsUsed.includes('rgb(255, 165, 0)') && colorsUsed.includes('rgb(255, 255, 255)')) {
            countryInput.value = 'India';
        } else {
            alert('Such bad drawing! Now type the name below.');
            let country = prompt('Enter the country name:');
            if(country) countryInput.value = country;
        }
    }
//--------------------------------------------------------------------------------------
    
    let currentNumber = 0;
    const phoneDisplay = document.getElementById('phone');
    
    function incrementPhone() {
        
        currentNumber++;
    
     let numberString = currentNumber.toString().padStart(10, '0');
    
        let leftPart = numberString.substring(0, 5);
        let rightPart = numberString.substring(5);
    
    
        phoneDisplay.value = leftPart + '-' + rightPart;
    }
    function validateForm() {
      const phoneInput = document.getElementById('phone');
      const phoneValue = phoneInput.value;
    
     
      if (phoneInput.checkValidity()) {
          alert('vaild form!');
          
      } else {
          alert('Please enter a valid 10-digit phone number in the format 00000-00000.');
      }
    }




//------------------------------------------------------------------------------------------------------
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const doneBtn = document.getElementById('doneBtn');
const ageInput = document.getElementById('age');


const toggleButtons = document.querySelectorAll('.toggle-btn');

const blanks = document.querySelectorAll('.binary-blank input[type="text"]');

const updateBlankValue = () => {

  blanks.forEach((blank, index) => {
    let binaryValue = '';

    const start = index * 8;
    const end = (index + 1) * 8;

    for (let i = start; i < end; i++) {
      const toggle = toggleButtons[i];
      binaryValue += toggle.checked ? '1' : '0';
    }

    const decimalValue = parseInt(binaryValue, 2); 
    blank.value = decimalValue;
  });
};

toggleButtons.forEach((btn) => {
  btn.addEventListener('change', updateBlankValue);
});

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  updateBlankValue(); 
});

doneBtn.addEventListener('click', () => {
  let totalDecimalAge = 0
  blanks.forEach((blank) => {
    totalDecimalAge += parseInt(blank.value, 10); 
  });

  
  ageInput.value = totalDecimalAge;
  modal.style.display = 'none';
});

//------------------------------------------------------------------------------------

let correctIndex;
        let attempts;
        let glasses = document.querySelectorAll(".glass");
        let slips = document.querySelectorAll(".slip");
        
        document.getElementById('gameModal').addEventListener('shown.bs.modal', () => {
            correctIndex = Math.floor(Math.random() * 3);
            attempts = 2;
            insertSlipThenShuffle();
        });
        
        function insertSlipThenShuffle() {
            
            document.querySelectorAll(".slip").forEach(slip => slip.remove());
        
            let slip = document.createElement("div");
            slip.classList.add("slip");
            slip.textContent = "FREE";
            slip.style.width = "60px";
            slip.style.height = "40px";
            slip.style.background = "yellow";
            slip.style.position = "absolute";
            slip.style.bottom = "-50px"; 
            slip.style.left = "50%";
            slip.style.transform = "translateX(-50%)";
            slip.style.textAlign = "center";
            slip.style.lineHeight = "40px";
            slip.style.fontWeight = "bold";
            slip.style.borderRadius = "5px";
            
            glasses[correctIndex].appendChild(slip);
        
        
            setTimeout(() => {
                slip.style.bottom = "10px"; 
                setTimeout(() => {
                    slip.remove(); 
                    shuffleGlasses();
                }, 1000);
            }, 500);
        }
        
        function shuffleGlasses() {
            let shuffleCount = 8;
            let shuffleInterval = setInterval(() => {
                let positions = [0, 100, -100].sort(() => Math.random() - 0.5);
                glasses.forEach((glass, i) => {
                    glass.style.transform = `translateX(${positions[i]}px)`;
                });
                shuffleCount--;
                if (shuffleCount <= 0) {
                    clearInterval(shuffleInterval);
                    setTimeout(() => {
                        glasses.forEach(glass => glass.style.transform = "translateX(0)");
                    }, 500);
                }
            }, 300);
        }

        function pickGlass(index) {
            if (attempts > 0) {
                if (index === correctIndex) {
                    let winningGlass = glasses[index];
                    let slip = slips[index];
                    
                    winningGlass.style.transform = "translateY(-50px)";
                    slip.style.display = "block";
                    slip.style.bottom = "60px";
                    
                    setTimeout(() => {
                        let email = prompt("Congratulations! Enter your email to receive the Netflix subscription:");
                        if (email) {
                            alert("You will receive your subscription at " + email);
                        }
                        let modal = bootstrap.Modal.getInstance(document.getElementById('gameModal'));
                        modal.hide();
                    }, 1000);
                } else {
                    attempts--;
                    if (attempts > 0) {
                        document.getElementById("gameMessage").textContent = "Wrong! Try again.";
                    } else {
                        setTimeout(() => {
                            alert("Better luck next time!");
                            let modal = bootstrap.Modal.getInstance(document.getElementById('gameModal'));
                            modal.hide();
                        }, 500);
                    }
                }
            }
        }

        document.getElementById('gameModal').addEventListener('shown.bs.modal', () => {
            document.querySelector('.glasses-container').style.display = 'flex';
            correctIndex = Math.floor(Math.random() * 3);
            attempts = 2;
            insertSlipThenShuffle();
        });
        document.getElementById('gameModal').addEventListener('shown.bs.modal', () => {
            document.getElementById('gameMessage').style.display = 'block'; 
            document.querySelector('.glasses-container').style.display = 'flex'; 
            correctIndex = Math.floor(Math.random() * 3);
            attempts = 2;
            insertSlipThenShuffle();
        });
               




        document.addEventListener("DOMContentLoaded", () => {
            const nameInput = document.getElementById("nameClickField1");
            const modal = document.getElementById("modalhar");
            const closeModal = document.querySelector(".close-btnhar");
            const alphabetBox = document.getElementById("alphabetBoxhar");
            const nameField = document.getElementById("nameFieldhar");
        
            
            nameInput.addEventListener("click", () => {
                modal.style.display = "flex";
            });
        
           
            closeModal.addEventListener("click", () => {
                modal.style.display = "none";
            });
        
            function shuffleAlphabets() {
                alphabetBox.innerHTML = "";
                const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        
                alphabets.forEach(letter => {
                    const div = document.createElement("div");
                    div.textContent = letter;
        
                    div.style.left = Math.random() * 230 + "px";
                    div.style.top = Math.random() * 230 + "px";
        
                    div.onclick = () => {
                        nameField.value += letter;
                        nameInput.value = nameField.value; 
                    };
        
                    alphabetBox.appendChild(div);
                });
        
                setTimeout(shuffleAlphabets, 1000);
            }
        
            shuffleAlphabets();
        
            
            window.clearLastCharacterhar = function() {
                nameField.value = nameField.value.slice(0, -1);
                nameInput.value = nameField.value; 
            };
        });


        const responses = [
            "Hello???", "Blame Chris", "Fuck you", "Fuck this", "Eat shit", 
            "Bitch please", "Daddy chill", "Mommy? Sorry.", "Send feet pics first", 
            "Bye.", "I'm so tired.", "Why did you wake me?", "Works on my machine.", 
            "What the fuck do you want?", "Yeah, you have a virus.", "Read the fucking manual!!", 
            "Bruh", "Your mom", "PEBKAC", "u up?", "wyd", "Honestly, shut the fuck up.", 
            "Send nudes.", "She’s a 10 but...", "Great success!", "uwu", 
            "You are loved", "Google is free", "What are those?", "Thanks Obama", "Boomer.", 
            "Grow up.", "Honestly fuck you", "We're not happy until you're frustrated", 
            "go to hell","you are idiot", "Oops, my bad. I could’ve sworn I was dealing with an adult.", 
            "It looks like your man can’t satisfy you. Need some help?", 
            "How may I help you?", "Calling 911", "This will be brought up to my therapist", 
            "Who the fuck asked?", "Game over", "Tame me daddy", "Ok", "k"
        ];
        
        // Elements
        const chatModal = document.getElementById("chatModal");
        const chatTriggerImg = document.getElementById("chatTriggerImg");
        const closeChat = document.getElementById("closeChat");
        const sendMessageBtn = document.getElementById("sendMessage");
        const userInput = document.getElementById("userInput");
        const chatMessages = document.getElementById("chatMessages");
        
        // Open chat modal
        chatTriggerImg.addEventListener("click", () => {
            chatModal.style.display = "flex";
        });
        
        // Close chat modal
        closeChat.addEventListener("click", () => {
            chatModal.style.display = "none";
        });
        
        // Handle sending messages
        sendMessageBtn.addEventListener("click", sendMessage);
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
        
        function sendMessage() {
            let userText = userInput.value.trim();
            if (!userText) return;
        
            // Display user message
            appendMessage("You: " + userText, "user-message");
        
            // Get AI response
            let aiResponse = responses[Math.floor(Math.random() * responses.length)];
            setTimeout(() => appendMessage("AI: " + aiResponse, "ai-message"), 500);
        
            userInput.value = "";
        }
        
        function appendMessage(text, className) {
            let message = document.createElement("div");
            message.classList.add(className);
            message.textContent = text;
            chatMessages.appendChild(message);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function generateCats(event) {
            const catImages = [
                'images/Lovepik_com-380636860-cute-black-cat-stickers-clipart-vector-black-cats.png',
                'images/white.png',
                'images/leaves.png',
                
            ];
            
            for (let i = 0; i < 50; i++) { // Increase count to cover more area
                let cat = document.createElement("div");
                cat.classList.add("cat");
                document.body.appendChild(cat);
                
                let x = Math.random() * window.innerWidth; // Spread across the entire screen
                let y = Math.random() * window.innerHeight;
                
                cat.style.left = `${x}px`;
                cat.style.top = `${y}px`;
                cat.style.backgroundImage = `url(${catImages[Math.floor(Math.random() * catImages.length)]})`;
            }
        }
//--------------------------------------------------------------------------------------captcha
document.addEventListener("DOMContentLoaded", function() {
    let captchaCheckbox = document.getElementById('captcha-checkbox');
    let proceedButton = document.getElementById('captcha-button');
    let gameContainer = document.getElementById('captcha-game-container');
    let gameButton = document.getElementById('game-button');
    let captchaStatus = document.getElementById('captcha-status');
    let target = document.querySelector('.moving-target');

    captchaCheckbox.addEventListener('change', function() {
        proceedButton.disabled = !this.checked;
    });

    proceedButton.addEventListener('click', function() {
        gameContainer.style.display = 'block';
        captchaStatus.textContent = ''; 
        gameButton.disabled = false; 
    });

    target.addEventListener('click', function() {
        captchaStatus.textContent = 'You clicked the moving target! Well done!';
        gameButton.disabled = true; 
    });

    
    gameButton.addEventListener('click', function() {
        captchaStatus.textContent = 'You clicked the moving target! Now, you are verified!';
        gameButton.disabled = true; 
    });
});

//-----------------------------------------------------------------------------------------------------------------------------------dob
const earth = document.getElementById("earth")
const dateButton = document.getElementById("dateoj")
const datePicker = document.getElementById("datePicker")
const ellipse = document.getElementById("ellipse")

var isPressing = false

const earthSize = 15
const horizontalRadius = 150
const verticalRadius = 73
const horizontalMargin = 25
const verticalMargin = 10

var today = new Date()
var year = today.getFullYear()
var start = new Date(today.getFullYear(), 0, 0)
var diff = today - start
const oneDay = 1000 * 60 * 60 * 24
var dayNumber = Math.floor(diff / oneDay)
var date = dateFromDay(dayNumber)
dateButton.children[0].innerText = addZero(date.getDate()) + "/" + addZero(date.getMonth()+1) + "/" + date.getFullYear()

var angle = 2*Math.asin(((dayNumber-1)/(182.5 + (isLeapyear()?0.5:0)))-1)
var x = horizontalRadius*Math.cos(angle)
var y = verticalRadius*Math.sin(angle)

earth.setAttribute("x",horizontalRadius + x - earthSize/2 + horizontalMargin)
earth.setAttribute("y",verticalRadius - y - earthSize/2 + verticalMargin)


earth.addEventListener("mousedown", mousedown)
earth.addEventListener("touchstart", mousedown)

addEventListener("mousemove", mousemove)
addEventListener("touchmove", mousemove)

addEventListener("mouseup", mouseup)
addEventListener("touchend", mouseup)


var dateButtonRect = dateButton.getBoundingClientRect()
datePicker.style.top = dateButtonRect.height + "px"
datePicker.style.right = 0
dateButton.style.height = dateButtonRect.height + "px"

function mousedown(e) {
  isPressing = true
}

function mousemove(e) {
  if(!isPressing)
    return
  
  const { clientX, clientY } = e.touches != null ? e.touches[0] : e
  
  const rect = ellipse.getBoundingClientRect()
  const ellipseCenterX = rect.x + rect.width/2 + horizontalMargin
  const ellipseCenterY = rect.y + rect.height/2 + verticalMargin
  angle = Math.atan2(ellipseCenterY - clientY, clientX - ellipseCenterX)

  let x = horizontalRadius*Math.cos(angle)
  let y = verticalRadius*Math.sin(angle)

  earth.setAttribute("x", horizontalRadius + x - earthSize/2 + horizontalMargin)
  earth.setAttribute("y", verticalRadius - y - earthSize/2 + verticalMargin)

  let oldDate = date

  var dayNumber = ((182.5 + (isLeapyear()?0.5:0))*(Math.sin((angle)/2) + 1) + 1)

  date = dateFromDay(dayNumber)

  if(oldDate.getDate() == 1 && oldDate.getMonth() == 0 && date.getDate() == 31 && date.getMonth() == 11){
    year--
  }else if(oldDate.getDate() == 31 && oldDate.getMonth() == 11 && date.getDate() == 1 && date.getMonth() == 0){
    year++
  }
  
  dayNumber = ((182.5 + (isLeapyear()?0.5:0))*(Math.sin((angle)/2)+1)+1)
  date = dateFromDay(dayNumber)

  if(date.getTime() > today.getTime()){
    dateButton.children[0].classList.add("future")
    dateButton.children[0].innerText = "Fuck you idiot dont make error" 
  }else{
    dateButton.children[0].classList.remove("future")
    dateButton.children[0].innerText = addZero(date.getDate()) + "/" + addZero(date.getMonth() + 1) + "/" + date.getFullYear()
  }
}

function dateFromDay(day){
  var date = new Date(year, 0)
  return new Date(date.setDate(day))
}

function mouseup(e) {
  isPressing = false
}

function addZero(num){
  return num<10?"0"+num:num
}

function isLeapyear(){
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
}
function openMouth() {
    let mouth = document.getElementById('mouth');
    let teeth = document.getElementById('teeth');
    let placeholder = document.getElementById('placeholder');
    let input = document.getElementById('feedback');
    
    mouth.style.height = '80px';
    placeholder.style.display = 'none';
    input.style.display = 'block';
    input.focus();
    
    let laughInterval = setInterval(() => {
        teeth.style.transform = teeth.style.transform === 'translateY(5px)' ? 'translateY(0px)' : 'translateY(5px)';
    }, 100);
    
    setTimeout(() => {
        clearInterval(laughInterval);
    }, 1000);
}

function checkSubmit(event) {
    if (event.key === 'Enter') {
        alert("Feedback submitted: " + document.getElementById('feedback').value);
        document.getElementById('feedback').value = "";
        document.getElementById('feedback').style.display = 'none';
        document.getElementById('placeholder').style.display = 'block';
        document.getElementById('mouth').style.height = '50px';
    }
}
