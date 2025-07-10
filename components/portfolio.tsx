"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, ExternalLink, Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Notification from "@/components/notification"
import emailjs from "@emailjs/browser"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState({
    isVisible: false,
    type: "success" as "success" | "error",
    message: "",
  })

  // Typing animation state
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  const typingTexts = ["I'm a Front-End Developer", "I'm a UI/UX Designer", "I'm a Passionate Coder"]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Typing animation effect
  useEffect(() => {
    const handleTyping = () => {
      const fullText = typingTexts[currentTextIndex]

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        setTypingSpeed(75) // Faster deletion (was 75)
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        setTypingSpeed(25) // Faster typing (was 25)
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000) // Shorter pause (was 2000)
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
      }
    }

    const typingTimer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(typingTimer)
  }, [currentText, isDeleting, currentTextIndex, typingSpeed, typingTexts])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "portfolio", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({
      isVisible: true,
      type,
      message,
    })
  }

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }))
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const templateParams = {
      from_name: formData.get("name") as string,
      from_email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      to_name: "YYA", // Your name
    }

    try {
      //  ❗ Replace the IDs & public key with your own from EmailJS
      await emailjs.send(
        "service_n0cn3ip", // Your EmailJS service ID
        "template_zt07b39", // Your EmailJS template ID
        templateParams,
        "FU2EZkKoJw-_55W6y", // Your EmailJS public key
      )

      form.reset()
      showNotification("success", "Your message has been sent successfully! I'll get back to you soon.")
    } catch (error) {
      console.error("EmailJS error:", error)
      showNotification("error", "Failed to send message. Please try again or contact me directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-3d">
            <div className="logo-cube">
              <div className="cube-face front">Y</div>
              <div className="cube-face back">A</div>
              <div className="cube-face right">Y</div>
              <div className="cube-face left">A</div>
              <div className="cube-face top">Y</div>
              <div className="cube-face bottom">Y</div>
            </div>
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="portfolio-container">
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">YYA</span>
          </div>

          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            {["home", "about", "skills", "portfolio", "education", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`nav-link ${activeSection === item ? "active" : ""}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="hero-particles"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-name">Hey, I am Ye Yint Aung</h1>
              <div className="typing-wrapper">
                <span className="typing-text">
                  {currentText}
                  <span className="typing-cursor">|</span>
                </span>
              </div>
              <div className="hero-buttons">
                <Button onClick={() => scrollToSection("portfolio")} className="btn-primary">
                  Explore My Work
                </Button>
                <a
                  href="/resume/YYA-Resume.pdf"
                  download="YYA-Resume.pdf"
                  className="btn-primary btn-resume inline-flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </div>
              <div className="social-links">
                <a href="https://github.com/yeyintaung27" className="social-link">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/ye-yint-aung-b8211b338/" className="social-link">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.facebook.com/ye.yint.aung.306534" className="social-link">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-container">
                <div className="image-glow"></div>
                <Image
                  src="/images/profile-hero.jpg"
                  alt="Web Developer"
                  width={400}
                  height={400}
                  className="profile-image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Passionate about creating premium digital solutions</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className="about-paragraph">
              I'm a front-end developer with hands-on experience in building responsive and user-friendly websites. I have developed multiple websites and applied my skills in real-world projects. I have strong problem-solving and project management abilities. I am experienced in coordinating with clients and stakeholders. I also have a solid understanding of software development and UI/UX design. I consistently deliver high-quality and reliable results.


              </p>
              {/* <p className="about-paragraph">
                I believe in the power of clean code, elegant design, and seamless user experiences. Every line of code
                I write is crafted with purpose, and every interface I design is built to inspire and engage.
              </p> */}
            </div>
            <div className="about-image">
              <div className="about-image-wrapper">
                <Image
                  src="/images/profile-about.jpg"
                  alt="YYA Professional"
                  width={400}
                  height={500}
                  className="about-img"
                />
                <div className="about-image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills</h2>
            <p className="section-subtitle">Mastering cutting-edge technologies</p>
          </div>
          <div className="skills-grid">
            {[
              // Frontend Skills
              { name: "React JS", level: 95, category: "Frontend", icon: "⚛️" },
              { name: "Next.js", level: 90, category: "Frontend", icon: "▲" },
              { name: "TypeScript", level: 88, category: "Frontend", icon: "📘" },
              { name: "Tailwind CSS", level: 92, category: "Frontend", icon: "🎨" },
              { name: "Bootstrap", level: 85, category: "Frontend", icon: "🅱️" },
              { name: "jQuery", level: 80, category: "Frontend", icon: "💛" },

              // UI/UX Skills
              { name: "Figma", level: 90, category: "UI/UX", icon: "🎯" },
              { name: "Wireframe", level: 85, category: "UI/UX", icon: "📐" },
              { name: "Prototype", level: 88, category: "UI/UX", icon: "🔧" },

              // Backend & Database Skills
              { name: "Java", level: 85, category: "Backend", icon: "☕" },
              { name: "PHP", level: 75, category: "Backend", icon: "🐘" },
              { name: "Spring Boot", level: 82, category: "Backend", icon: "🍃" },
              { name: "MySQL", level: 88, category: "Database", icon: "🗄️" },
              { name: "Firebase", level: 80, category: "Database", icon: "🔥" },

              // Tools & Deployment
              { name: "Git & GitHub", level: 90, category: "Tools", icon: "🐙" },
              { name: "Netlify", level: 85, category: "Deployment", icon: "🌐" },
              { name: "WordPress", level: 78, category: "CMS", icon: "📝" },
            ].map((skill, index) => (
              <div key={skill.name} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="skill-header">
                  <div className="skill-info">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <Badge variant="secondary" className="skill-category">
                    {skill.category}
                  </Badge>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Portfolio</h2>
            <p className="section-subtitle">Showcasing exceptional digital experiences</p>
          </div>
          <div className="portfolio-grid">
            {[
              {
                title: "Coffee Shop",
                description: "Built a Coffee Shop website.",
                image: "/images/web1.png",
                technologies: ["HTML", "CSS", "JavaScript", "JQuery"],
                liveUrl: "https://yeyintaung27.github.io/Coffee-Shop/",
                githubUrl: "https://github.com/yeyintaung27/Coffee-Shop",
                featured: true,
              },
              {
                title: "Car Portal Website",
                description: "Developed a car portal with real-time analytics dashboards",
                image: "/images/web4.png",
                technologies: ["Spring Boot", "Node.js", "Java", "HTML", "CSS", "JavaScript"],
                liveUrl: "#",
                githubUrl: "https://github.com/yeyintaung27/Car_portal",
                featured: true,
              },
              {
                title: "Martial Arts",
                description: "Created a website design  for martial arts businesses.",
                image: "/images/Web2.png",
                technologies: ["HTML", "CSS", "JavaScript", "JQuery"],
                liveUrl: "https://yeyintaung27.github.io/DoBU-Martial-Arts/",
                githubUrl: "https://github.com/yeyintaung27/DoBU-Martial-Arts",
                featured: true,
              },
              {
                title: "Meals On Wheel Project",
                description: "Developed a food delivery platform with interactive UI and admin order management.",
                image: "/images/web5.png",
                technologies: ["React Js", "Spring Boot", "Java", "HTML", "CSS", "JavaScript"],
                liveUrl: "#",
                githubUrl: "https://github.com/yeyintaung27/Meals-On-Wheel",
                featured: false,
              },
              {
                title: "ABC Learning Center",
                description: "Designed a real-time learning platform with advanced charting and portfolio tools.",
                image: "/images/web3.png",
                technologies: ["HTML", "CSS", "JavaScript", "JQuery"],
                liveUrl: "https://yeyintaung27.github.io/ABCLearningCentre/",
                githubUrl: "https://github.com/yeyintaung27/ABCLearningCentre",
                featured: true,
              },
              {
                title: "Training Department Course",
                description: "Engineered a smart learning management system with personalized content delivery.",
                image: "/images/web6.png",
                technologies: ["Spring Boot", "Java", "HTML", "CSS", "JavaScript"],
                liveUrl: "#",
                githubUrl: "https://github.com/yeyintaung27/TrainingDepartmentCourse",
                featured: false,
              },
            ].map((project, index) => (
              <Card
                key={project.title}
                className={`portfolio-card ${project.featured ? "featured" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {project.featured && <div className="featured-badge">Featured</div>}
                <div className="portfolio-image">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="project-img"
                  />
                  <div className="portfolio-overlay">
                  <div className="portfolio-links">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a href={project.liveUrl} className="portfolio-link">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a href={project.githubUrl} className="portfolio-link">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                  </div>
                </div>
                <CardContent className="portfolio-content">
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-description">{project.description}</p>
                  <div className="portfolio-technologies">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="tech-badge">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section education-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Journey of Excellence</h2>
            <p className="section-subtitle">Professional milestones and continuous learning</p>
          </div>
          <div className="timeline">
            {[
              {
                type: "education",
                title: "Bachelor of Computer Science",
                organization: "University of Roehampton",
                period: "2025 - Ongoing",
                description:
                  "Currently deepening my academic knowledge in AI, machine learning, and cybersecurity. Actively engaging in research-based projects and collaborative learning environments. Eager to apply theoretical knowledge to practical internships to grow as a future software engineer.",
              },
              {
                type: "work",
                title: "Junior Web Developer",
                organization: "Digital Solutions Co.",
                period: "2023 - 2024",
                description:
                  "Developed responsive websites using HTML, CSS, JavaScript, and modern frameworks. Collaborated with design teams to implement pixel-perfect UI/UX designs. Maintained and optimized existing web applications for improved performance and user experience.",
              },
              {
                type: "education",
                title: "Computer Science Level 4-5",
                organization: "Lithan EduClaaS Academy",
                period: "2022 - 2025",
                description:
                  "Focused on advanced software engineering, data structures, and database management. Worked on real-world applications using Python, SQL, and web technologies. Experienced in Agile development and version control (Git), and passionate about building scalable, user-friendly solutions.",
              },
              {
                type: "education",
                title: "Computer Science Level 3",
                organization: "Lithan EduClaaS Academy",
                period: "2021 - 2022",
                description:
                  "Gained strong foundational knowledge in programming, web development, and computer systems. Successfully completed several projects using HTML, CSS, and JavaScript. Developed effective problem-solving and teamwork skills through hands-on assignments and group projects.",
              },
              {
                type: "work",
                title: "Web Development Trainee",
                organization: "StartUp Incubator",
                period: "2022 - 2023",
                description:
                  "Assisted in building MVP applications for early-stage startups. Learned industry best practices in version control, testing, and deployment. Participated in code reviews and contributed to documentation for development processes.",
              },
            ].map((item, index) => (
              <div key={index} className={`timeline-item ${item.type}`}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.title}</h3>
                  <h4 className="timeline-organization">{item.organization}</h4>
                  <span className="timeline-period">{item.period}</span>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Let's Create Something Amazing</h2>
            <p className="section-subtitle">Ready to bring your vision to life with premium quality</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3 className="contact-info-title">Get In Touch</h3>
              <p className="contact-info-description">
                I'm always excited to discuss new opportunities and innovative projects. Let's create something
                extraordinary together.
              </p>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">yeyintaung638864@gmail.com</span>
                </div>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+66 991307019</span>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Bangkok, Thailand</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <Input type="text" name="name" placeholder="Your Name" required className="form-input" />
                </div>
                <div className="form-group">
                  <Input type="email" name="email" placeholder="Your Email" required className="form-input" />
                </div>
              </div>
              {/* <div className="form-group">
                <Input type="text" name="subject" placeholder="Project Subject" required className="form-input" />
              </div> */}
              <div className="form-group">
                <Textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  className="form-textarea"
                  rows={5}
                />
              </div>
              <Button type="submit" className="btn-primary form-submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-text">YYA</span>
                <span className="logo-subtitle"></span>
              </div>
              <p className="footer-description">
                Crafting exceptional digital experiences with premium quality and attention to detail.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-social">
                <a href="https://github.com/yeyintaung27" className="footer-social-link">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/ye-yint-aung-b8211b338/" className="footer-social-link">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.facebook.com/ye.yint.aung.306534" className="footer-social-link">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
