const text = "Red Phantom";
      let index = 0;
      const speed = 100;

      function typeWriter() {
        const title = document.getElementById("typewriter");
        if (index < text.length) {
          title.innerHTML += text.charAt(index);
          index++;
          setTimeout(typeWriter, speed);
        }
      }

      window.onload = function () {
        typeWriter();
        setTimeout(function () {
          window.location.href = "./auth/login.html";
        }, 1500);
      };
