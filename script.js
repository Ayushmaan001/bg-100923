   // Custom Cursor
   const cursor = document.querySelector('.cursor');
   const cursorFollower = document.querySelector('.cursor-follower');
   
   document.addEventListener('mousemove', (e) => {
       cursor.style.left = e.clientX + 'px';
       cursor.style.top = e.clientY + 'px';
       
       setTimeout(() => {
           cursorFollower.style.left = e.clientX + 'px';
           cursorFollower.style.top = e.clientY + 'px';
       }, 100);
   });

   // Enhanced Particle System
   function createParticle() {
       const particle = document.createElement('div');
       particle.className = 'particle';
       particle.style.left = Math.random() * 100 + '%';
       particle.style.animationDuration = Math.random() * 3 + 5 + 's';
       particle.style.animationDelay = Math.random() * 2 + 's';
       document.getElementById('particles').appendChild(particle);
       
       setTimeout(() => {
           particle.remove();
       }, 8000);
   }

   // Create multiple particles
   setInterval(createParticle, 300);

   // Enhanced Floating Hearts
   function createFloatingHeart() {
       const heart = document.createElement('div');
       heart.className = 'floating-heart';
       heart.innerHTML = ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
       heart.style.left = Math.random() * 100 + '%';
       heart.style.animationDuration = Math.random() * 2 + 4 + 's';
       heart.style.animationDelay = Math.random() * 2 + 's';
       document.getElementById('floatingHearts').appendChild(heart);
       
       setTimeout(() => {
           heart.remove();
       }, 6000);
   }

   setInterval(createFloatingHeart, 800);

   // Click Hearts Effect
   document.addEventListener('click', (e) => {
       for (let i = 0; i < 6; i++) {
           const heart = document.createElement('div');
           heart.innerHTML = '💖';
           heart.style.position = 'fixed';
           heart.style.left = e.clientX + 'px';
           heart.style.top = e.clientY + 'px';
           heart.style.pointerEvents = 'none';
           heart.style.color = '#ff6b9d';
           heart.style.fontSize = '1.5rem';
           heart.style.zIndex = '9999';
           heart.style.animation = `clickHeart 1s ease-out forwards`;
           heart.style.animationDelay = i * 0.1 + 's';
           
           const randomX = (Math.random() - 0.5) * 100;
           const randomY = (Math.random() - 0.5) * 100;
           
           heart.style.setProperty('--randomX', randomX + 'px');
           heart.style.setProperty('--randomY', randomY + 'px');
           
           document.getElementById('clickHearts').appendChild(heart);
           
           setTimeout(() => heart.remove(), 1000);
       }
   });

   // Add click heart animation to CSS
   const style = document.createElement('style');
   style.textContent = `
       @keyframes clickHeart {
           0% {
               opacity: 1;
               transform: scale(0) translate(0, 0);
           }
           50% {
               opacity: 1;
               transform: scale(1.2) translate(var(--randomX), var(--randomY));
           }
           100% {
               opacity: 0;
               transform: scale(0) translate(var(--randomX), calc(var(--randomY) - 50px));
           }
       }
   `;
   document.head.appendChild(style);

   // Enhanced Real-time Counter
   function updateCounter() {
       const startDate = new Date('2023-09-09T00:00:00');
       const now = new Date();
       const diff = now - startDate;

       const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
       const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
       const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
       const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

       // Animate number changes
       animateNumber('years', years);
       animateNumber('months', months);
       animateNumber('days', days);
       animateNumber('hours', hours);
       animateNumber('minutes', minutes);
       animateNumber('seconds', seconds);
   }

   function animateNumber(elementId, newValue) {
       const element = document.getElementById(elementId);
       const currentValue = parseInt(element.textContent) || 0;
       
       if (currentValue !== newValue) {
           element.style.transform = 'scale(1.2)';
           element.style.color = '#feca57';
           
           setTimeout(() => {
               element.textContent = newValue;
               element.style.transform = 'scale(1)';
               element.style.color = '#ff6b9d';
           }, 150);
       }
   }

   // Music Control System
   const musicControl = document.getElementById('musicControl');
   const musicText = document.getElementById('musicText');
   const musicWaves = document.getElementById('musicWaves');
   const backgroundMusic = document.getElementById('backgroundMusic');
   
   let isPlaying = false;
   let musicInitialized = false;

   // Auto-play on first user interaction
   function initializeMusic() {
       if (!musicInitialized) {
           musicInitialized = true;
           // You can add your music source here
           // backgroundMusic.src = 'your-track.mp3';
           
           // For now, we'll simulate music with visual effects
           simulateMusic();
       }
   }

   function simulateMusic() {
       isPlaying = !isPlaying;
       
       if (isPlaying) {
           musicText.textContent = '🎵 Now Playing';
           musicWaves.style.animationPlayState = 'running';
           document.body.style.animation = 'musicPulse 2s infinite ease-in-out';
       } else {
           musicText.textContent = '🎵 Click to Play';
           musicWaves.style.animationPlayState = 'paused';
           document.body.style.animation = 'none';
       }
   }

   // Add music pulse animation
   const musicStyle = document.createElement('style');
   musicStyle.textContent = `
       @keyframes musicPulse {
           0%, 100% { filter: brightness(1); }
           50% { filter: brightness(1.1); }
       }
   `;
   document.head.appendChild(musicStyle);

   musicControl.addEventListener('click', () => {
       initializeMusic();
   });

   // Initialize music on first click anywhere
   document.addEventListener('click', initializeMusic, { once: true });

   // Enhanced Quiz System
   let currentQuestion = 0;
   let score = 0;
   let totalQuestions = 4;
   let quizAnswers = [];

   function selectAnswer(questionIndex, isCorrect) {
       quizAnswers[questionIndex] = isCorrect;
       
       if (isCorrect) {
           score++;
           // Visual feedback for correct answer
           event.target.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
           event.target.innerHTML += ' ✅';
       } else {
           // Visual feedback for wrong answer
           event.target.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
           event.target.innerHTML += ' ❌';
       }
       
       // Disable all options for this question
       const options = event.target.parentNode.querySelectorAll('.option-btn');
       options.forEach(opt => opt.disabled = true);
       
       // Update progress
       updateQuizProgress();
       
       // Move to next question after delay
       setTimeout(() => {
           nextQuestion();
       }, 1500);
   }

   function updateQuizProgress() {
       const progress = ((currentQuestion + 1) / totalQuestions) * 100;
       document.getElementById('progressFill').style.width = progress + '%';
   }

   function nextQuestion() {
       const questions = document.querySelectorAll('.question');
       questions[currentQuestion].classList.remove('active');
       currentQuestion++;
       
       if (currentQuestion < questions.length) {
           questions[currentQuestion].classList.add('active');
       } else {
           showQuizResult();
       }
   }

   function showQuizResult() {
       document.querySelector('.question.active')?.classList.remove('active');
       const resultDiv = document.getElementById('quizResult');
       const scoreDisplay = document.getElementById('scoreDisplay');
       const scoreMessage = document.getElementById('scoreMessage');
       
       resultDiv.style.display = 'block';
       scoreDisplay.textContent = `${score}/${totalQuestions}`;
       
       let message = '';
       let celebration = '';
       
       if (score === totalQuestions) {
           message = "Perfect! You know our love story by heart! 💕";
           celebration = createCelebration();
       } else if (score >= totalQuestions * 0.75) {
           message = "Excellent! You really understand our journey! 🌟";
       } else if (score >= totalQuestions * 0.5) {
           message = "Good job! You know us pretty well! 😊";
       } else {
           message = "You're learning about our beautiful story! 💖";
       }
       
       scoreMessage.innerHTML = message;
       
       // Animate score
       let currentScore = 0;
       const scoreInterval = setInterval(() => {
           if (currentScore <= score) {
               scoreDisplay.textContent = `${currentScore}/${totalQuestions}`;
               currentScore++;
           } else {
               clearInterval(scoreInterval);
           }
       }, 200);
   }

   function createCelebration() {
       // Confetti effect for perfect score
       for (let i = 0; i < 50; i++) {
           setTimeout(() => {
               const confetti = document.createElement('div');
               confetti.innerHTML = ['🎉', '💖', '🌟', '💕', '✨'][Math.floor(Math.random() * 5)];
               confetti.style.position = 'fixed';
               confetti.style.left = Math.random() * 100 + '%';
               confetti.style.top = '-10px';
               confetti.style.pointerEvents = 'none';
               confetti.style.fontSize = '2rem';
               confetti.style.zIndex = '9999';
               confetti.style.animation = 'confettiFall 3s ease-out forwards';
               
               document.body.appendChild(confetti);
               setTimeout(() => confetti.remove(), 3000);
           }, i * 100);
       }
   }

   const confettiStyle = document.createElement('style');
   confettiStyle.textContent = `
       @keyframes confettiFall {
           0% {
               transform: translateY(-10px) rotate(0deg);
               opacity: 1;
           }
           100% {
               transform: translateY(100vh) rotate(720deg);
               opacity: 0;
           }
       }
   `;
   document.head.appendChild(confettiStyle);

   function resetQuiz() {
       currentQuestion = 0;
       score = 0;
       quizAnswers = [];
       
       const questions = document.querySelectorAll('.question');
       questions.forEach((q, index) => {
           q.classList.remove('active');
           const options = q.querySelectorAll('.option-btn');
           options.forEach(opt => {
               opt.disabled = false;
               opt.style.background = 'linear-gradient(45deg, rgba(255, 107, 157, 0.2), rgba(196, 69, 105, 0.2))';
               opt.innerHTML = opt.innerHTML.replace(' ✅', '').replace(' ❌', '');
           });
       });
       
       questions[0].classList.add('active');
       document.getElementById('quizResult').style.display = 'none';
       document.getElementById('progressFill').style.width = '0%';
   }

   // Smooth Scrolling
   function scrollToTimeline() {
       document.getElementById('timeline').scrollIntoView({
           behavior: 'smooth',
           block: 'start'
       });
   }

   // Scroll Reveal Animation
   function revealOnScroll() {
       const reveals = document.querySelectorAll('.reveal');
       
       reveals.forEach(reveal => {
           const windowHeight = window.innerHeight;
           const elementTop = reveal.getBoundingClientRect().top;
           const revealPoint = 150;
           
           if (elementTop < windowHeight - revealPoint) {
               reveal.classList.add('revealed');
           }
       });
   }

   // Enhanced Gallery Card Interactions
   document.querySelectorAll('.gallery-card').forEach(card => {
       card.addEventListener('mouseenter', function() {
           this.style.transform = 'rotateY(10deg) rotateX(5deg) scale(1.05)';
           this.style.zIndex = '10';
       });
       
       card.addEventListener('mouseleave', function() {
           this.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
           this.style.zIndex = '1';
       });
       
       card.addEventListener('click', function() {
           // Create a zoom effect
           this.style.transform = 'scale(1.1)';
           setTimeout(() => {
               this.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
           }, 300);
           
           // Add sparkle effect
           for (let i = 0; i < 10; i++) {
               setTimeout(() => {
                   const sparkle = document.createElement('div');
                   sparkle.innerHTML = '✨';
                   sparkle.style.position = 'absolute';
                   sparkle.style.left = Math.random() * 100 + '%';
                   sparkle.style.top = Math.random() * 100 + '%';
                   sparkle.style.pointerEvents = 'none';
                   sparkle.style.animation = 'sparkle 1s ease-out forwards';
                   
                   this.appendChild(sparkle);
                   setTimeout(() => sparkle.remove(), 1000);
               }, i * 100);
           }
       });
   });

   const sparkleStyle = document.createElement('style');
   sparkleStyle.textContent = `
       @keyframes sparkle {
           0% {
               transform: scale(0) rotate(0deg);
               opacity: 1;
           }
           50% {
               transform: scale(1) rotate(180deg);
               opacity: 1;
           }
           100% {
               transform: scale(0) rotate(360deg);
               opacity: 0;
           }
       }
   `;
   document.head.appendChild(sparkleStyle);

   // Initialize everything
   updateCounter();
   setInterval(updateCounter, 1000); // Update every second
   
   window.addEventListener('scroll', revealOnScroll);
   revealOnScroll(); // Initial check

   // Enhanced interaction feedback
   document.querySelectorAll('button, .gallery-card, .counter-card').forEach(element => {
       element.addEventListener('mouseenter', function() {
           cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
           cursor.style.borderColor = '#feca57';
       });
       
       element.addEventListener('mouseleave', function() {
           cursor.style.transform = 'translate(-50%, -50%) scale(1)';
           cursor.style.borderColor = '#ff6b9d';
       });
   });

   // Welcome message on load
   window.addEventListener('load', function() {
       setTimeout(() => {
           // Create welcome hearts burst
           for (let i = 0; i < 20; i++) {
               setTimeout(() => {
                   const heart = document.createElement('div');
                   heart.innerHTML = '💖';
                   heart.style.position = 'fixed';
                   heart.style.left = '50%';
                   heart.style.top = '50%';
                   heart.style.pointerEvents = 'none';
                   heart.style.fontSize = '2rem';
                   heart.style.zIndex = '9999';
                   heart.style.animation = 'welcomeBurst 2s ease-out forwards';
                   
                   const angle = (i / 20) * 360;
                   heart.style.setProperty('--angle', angle + 'deg');
                   
                   document.body.appendChild(heart);
                   setTimeout(() => heart.remove(), 2000);
               }, i * 50);
           }
       }, 500);
   });

   const welcomeStyle = document.createElement('style');
   welcomeStyle.textContent = `
       @keyframes welcomeBurst {
           0% {
               transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0);
               opacity: 1;
           }
           50% {
               opacity: 1;
               transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-100px) scale(1);
           }
           100% {
               opacity: 0;
               transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-150px) scale(0);
           }
       }
   `;
   document.head.appendChild(welcomeStyle);

   console.log("💖 Welcome to Ayushmaan & Deepanshi's Love Story! 💖");
   console.log("This webpage is filled with love and interactive surprises!");
   console.log("Click around and explore all the magical features! ✨");
   // Auto music play on any interaction
   const audio = document.getElementById("backgroundMusic");
   let hasPlayed = false;

   const playOnce = () => {
     if (!hasPlayed) {
       audio.play().catch(() => {});
       hasPlayed = true;
       document.removeEventListener("click", playOnce);
       document.removeEventListener("keydown", playOnce);
       document.removeEventListener("touchstart", playOnce);
     }
   };

   document.addEventListener("click", playOnce);
   document.addEventListener("keydown", playOnce);
   document.addEventListener("touchstart", playOnce);

   function toggleMusic() {
     if (audio.paused) {
       audio.play();
     } else {
       audio.pause();
     }
   }