// ══════════════════════════════════════════════════════════
// KEVIN KATTAKAYAM PORTFOLIO — Interactivity
// ══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ─── Navbar scroll effect ───
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ─── Mobile hamburger menu ───
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ─── Active nav link on scroll ───
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = navLinks.querySelectorAll('a:not(.nav-cta)');

    const setActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', setActiveLink, { passive: true });

    // ─── Scroll-reveal with Intersection Observer ───
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for siblings
                const siblings = entry.target.parentElement.querySelectorAll('.reveal');
                const sibIndex = Array.from(siblings).indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('active');
                }, sibIndex * 100);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── Animated stat counters ───
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.dataset.target);
            const isDecimal = stat.dataset.decimal === 'true';
            const suffix = stat.dataset.suffix || '';
            const duration = 2000;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;

                if (isDecimal) {
                    stat.textContent = current.toFixed(2) + suffix;
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // ─── More certifications toggle ───
    const moreCertsToggle = document.getElementById('moreCertsToggle');
    const moreCertsList = document.getElementById('moreCertsList');

    if (moreCertsToggle && moreCertsList) {
        moreCertsToggle.addEventListener('click', () => {
            moreCertsToggle.classList.toggle('open');
            moreCertsList.classList.toggle('open');

            const isOpen = moreCertsList.classList.contains('open');
            moreCertsToggle.innerHTML = isOpen
                ? 'Show Less <i class="fas fa-chevron-up"></i>'
                : 'More Certifications & Courses <i class="fas fa-chevron-down"></i>';
        });
    }

    // ─── Smooth scroll for all anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── Parallax effect on hero orbs ───
    const orbs = document.querySelectorAll('.hero-orb');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 8;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    }, { passive: true });

});
