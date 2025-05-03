// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
      mirror: true,
      offset: 50,
    })
  
    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear()
  
    // Custom cursor
    const cursor = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-dot-outline")
  
    if (cursor && cursorOutline) {
      // Show cursor when mouse moves
      document.addEventListener("mousemove", (e) => {
        if (cursor.style.opacity === "0" || cursor.style.opacity === "") {
          cursor.style.opacity = "1"
          cursorOutline.style.opacity = "1"
        }
  
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"
  
        // Add a slight delay to the outline for a trailing effect
        setTimeout(() => {
          cursorOutline.style.left = e.clientX + "px"
          cursorOutline.style.top = e.clientY + "px"
        }, 50)
      })
  
      // Hide cursor when mouse leaves the window
      document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0"
        cursorOutline.style.opacity = "0"
      })
  
      // Change cursor size on clickable elements
      document.querySelectorAll("a, button, .skill-category, .filter-btn").forEach((item) => {
        item.addEventListener("mouseenter", () => {
          cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
          cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
          cursorOutline.style.borderColor = "var(--primary)"
        })
  
        item.addEventListener("mouseleave", () => {
          cursor.style.transform = "translate(-50%, -50%) scale(1)"
          cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
          cursorOutline.style.borderColor = "var(--primary)"
        })
      })
    }
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
  
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }
      })
    }
  
    // Mobile navigation toggle
    const navToggle = document.getElementById("navToggle")
    const navLinks = document.getElementById("navLinks")
  
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
  
      // Close mobile menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          navToggle.classList.remove("active")
          navLinks.classList.remove("active")
        })
      })
    }
  
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section[id]")
  
    function highlightNavLink() {
      const scrollY = window.pageYOffset
  
      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 100
        const sectionId = section.getAttribute("id")
  
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(".nav-link[href*=" + sectionId + "]").classList.add("active")
        } else {
          document.querySelector(".nav-link[href*=" + sectionId + "]").classList.remove("active")
        }
      })
    }
  
    window.addEventListener("scroll", highlightNavLink)
  
    // Skills tabs
    const skillTabs = document.querySelectorAll(".skill-tab")
    const skillContents = document.querySelectorAll(".skill-content")
  
    if (skillTabs.length > 0 && skillContents.length > 0) {
      skillTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          const target = this.getAttribute("data-category")
  
          // Update active tab
          skillTabs.forEach((t) => t.classList.remove("active"))
          this.classList.add("active")
  
          // Show corresponding skill content
          skillContents.forEach((content) => content.classList.remove("active"))
          document.getElementById(`${target}-skills`).classList.add("active")
  
          // Add 3D rotation effect to icons
          const icons = document.querySelectorAll(".skill-content.active .skill-icon")
          icons.forEach((icon) => {
            // Reset any existing animations
            icon.style.animation = "none"
  
            // Trigger reflow
            void icon.offsetWidth
  
            // Add animation
            icon.style.animation = "fadeIn 0.5s forwards"
          })
        })
      })
  
      // Add hover effect for 3D icons
      const skillCards = document.querySelectorAll(".skill-card")
      skillCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          const icon = this.querySelector(".skill-icon")
          icon.style.transform = "translateZ(30px) rotateY(15deg)"
        })
  
        card.addEventListener("mouseleave", function () {
          const icon = this.querySelector(".skill-icon")
          icon.style.transform = "translateZ(20px) rotateY(0deg)"
        })
      })
    }
  
    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    if (filterButtons.length > 0 && projectCards.length > 0) {
      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const filter = this.getAttribute("data-filter")
  
          // Update active button
          filterButtons.forEach((btn) => btn.classList.remove("active"))
          this.classList.add("active")
  
          // Filter projects
          projectCards.forEach((card) => {
            if (filter === "all") {
              card.style.display = "block"
              setTimeout(() => {
                card.style.opacity = "1"
                card.style.transform = "scale(1)"
              }, 100)
            } else {
              if (card.getAttribute("data-category").includes(filter)) {
                card.style.display = "block"
                setTimeout(() => {
                  card.style.opacity = "1"
                  card.style.transform = "scale(1)"
                }, 100)
              } else {
                card.style.opacity = "0"
                card.style.transform = "scale(0.8)"
                setTimeout(() => {
                  card.style.display = "none"
                }, 300)
              }
            }
          })
        })
      })
    }
  
    // Contact form handling
    const contactForm = document.getElementById("contactForm")
    const formSuccess = document.getElementById("formSuccess")
    const sendAnother = document.getElementById("sendAnother")
  
    if (contactForm && formSuccess) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simulate form submission with loading state
        const submitButton = contactForm.querySelector('button[type="submit"]')
        const originalButtonText = submitButton.innerHTML
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitButton.disabled = true
  
        // Simulate API call delay
        setTimeout(() => {
          // Hide form and show success message
          contactForm.style.display = "none"
          formSuccess.style.display = "block"
  
          // Reset form
          contactForm.reset()
          submitButton.innerHTML = originalButtonText
          submitButton.disabled = false
        }, 1500)
      })
    }
  
    // Send another message button
    if (sendAnother) {
      sendAnother.addEventListener("click", () => {
        formSuccess.style.display = "none"
        contactForm.style.display = "block"
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Project card hover effects
    projectCards.forEach((card) => {
      const arrow = card.querySelector(".fa-arrow-right")
      if (arrow) {
        card.addEventListener("mouseenter", () => {
          arrow.style.transform = "translateX(5px)"
        })
  
        card.addEventListener("mouseleave", () => {
          arrow.style.transform = "translateX(0)"
        })
      }
    })
  
    // Back to top button
    const backToTop = document.querySelector(".back-to-top")
    if (backToTop) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
          backToTop.style.opacity = "1"
          backToTop.style.visibility = "visible"
        } else {
          backToTop.style.opacity = "0"
          backToTop.style.visibility = "hidden"
        }
      })
    }
  })
  
  