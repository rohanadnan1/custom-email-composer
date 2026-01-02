"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A full-featured online store with cart, checkout, and payment integration.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    tags: ["Next.js", "Stripe", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    category: "UI/UX Design",
    description: "Analytics dashboard with real-time data visualization and user management.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["React", "TypeScript", "Chart.js"],
    link: "#",
  },
  {
    id: 3,
    title: "Restaurant Website",
    category: "Web Development",
    description: "Modern restaurant website with online ordering and reservation system.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    tags: ["Next.js", "Sanity CMS", "Framer Motion"],
    link: "#",
  },
  {
    id: 4,
    title: "Healthcare App",
    category: "Mobile App",
    description: "Telemedicine platform connecting patients with healthcare providers.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tags: ["React Native", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    id: 5,
    title: "Real Estate Platform",
    category: "Web Development",
    description: "Property listing platform with advanced search and virtual tours.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    tags: ["Next.js", "PostgreSQL", "Mapbox"],
    link: "#",
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "UI/UX Design",
    description: "Creative portfolio showcasing photography and design work.",
    image: "https://images.unsplash.com/photo-1545665277-5937489579f2?w=800&q=80",
    tags: ["React", "GSAP", "Three.js"],
    link: "#",
  },
];

const categories = ["All", "Web Development", "UI/UX Design", "Mobile App"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(max-width: 640px)": { slidesToScroll: 1 },
      "(min-width: 641px) and (max-width: 1024px)": { slidesToScroll: 1 },
      "(min-width: 1025px)": { slidesToScroll: 1 },
    },
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [activeCategory, emblaApi]);

  // Scroll-triggered animations
  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      const headerElements = headerRef.current.querySelectorAll("span, h2, p");
      
      gsap.fromTo(
        headerElements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }

    // Cards container animation
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="container-cls mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title uppercase">Some Of Our Work</h2>
          <p className="text-muted max-w-4xl mx-auto">
            We have worked with clients all over the world for home services contractors, restaurants, consulting agencies, start ups, dermatologists, doctors, accountants, and more. No matter what your business is, we can build a website that is effective, beautiful, performant, and tailored to your industry.
          </p>
        </div>

        {/* Category Filter */}
        {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "gradient-bg text-white"
                  : "bg-secondary text-muted hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div> */}

        {/* Projects Slider */}
        <div className="relative" ref={cardsContainerRef}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.333%-21px)]"
                >
                  <a
                    href={project.link}
                    className="group block rounded-2xl overflow-hidden bg-card-bg border border-card-border card-hover h-full"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* View Button */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-white text-sm font-medium">View Project</span>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17 17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-semibold mt-2 mb-2">{project.title}</h3>
                      <p className="text-muted text-sm mb-4">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full bg-secondary text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              <button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="w-12 h-12 rounded-full bg-card-bg border border-card-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="w-12 h-12 rounded-full bg-card-bg border border-card-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Button */}
            <div className="text-center">
              <a href="#" className="btn-secondary">
                View All Projects
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
