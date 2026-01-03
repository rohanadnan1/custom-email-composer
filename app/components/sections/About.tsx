"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Expert Development",
    description: "Hand-crafted code built with modern technologies for optimal performance.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized for speed with 100/100 Google PageSpeed scores as standard.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "SEO Optimized",
    description: "Built-in SEO best practices to help your site rank higher in search results.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Fully Responsive",
    description: "Beautiful designs that work perfectly on all devices and screen sizes.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Ongoing support and maintenance to keep your site running smoothly.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Lifetime Updates",
    description: "Free updates and improvements for as long as you're with us.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    // Image animation - slide in from left
    gsap.set(imageRef.current, { opacity: 0, x: -100 });
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(imageRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onRefresh: (self) => {
        if (self.progress === 1) {
          gsap.set(imageRef.current, { opacity: 1, x: 0 });
        }
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Content animation - slide in from right
    gsap.set(contentRef.current, { opacity: 0, x: 100 });
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(contentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onRefresh: (self) => {
        if (self.progress === 1) {
          gsap.set(contentRef.current, { opacity: 1, x: 0 });
        }
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;

    // Heading elements animation
    const headerElements = headingRef.current.querySelectorAll("span, h2, p");
    gsap.set(headerElements, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(headerElements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
        });
      },
      onRefresh: (self) => {
        if (self.progress === 1) {
          gsap.set(headerElements, { opacity: 1, y: 0 });
        }
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (featureItemsRef.current.length === 0) return;

    // Features grid animation - stagger from bottom
    featureItemsRef.current.forEach((item) => {
      if (item) {
        gsap.set(item, { opacity: 0, y: 50 });
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: featuresRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(featureItemsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
        });
      },
      onRefresh: (self) => {
        if (self.progress === 1) {
          featureItemsRef.current.forEach((item) => {
            if (item) gsap.set(item, { opacity: 1, y: 0 });
          });
        }
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section id="about" className="bg-card-bg py-24 md:py-32 relative" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/50 from-primary/10 to-transparent rounded-full blur-3xl -z-10" />

      <div className="container-cls mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image with decorative elements */}
          <div ref={imageRef} className="relative">
            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 z-10" />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative badge */}
            {/* <div className="absolute -bottom-6 -right-6 bg-card-bg border-2 border-primary rounded-2xl p-6 shadow-xl backdrop-blur">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10+</div>
                <p className="text-sm text-muted-foreground whitespace-nowrap">Years Experience</p>
              </div>
            </div> */}
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Header */}
            <div ref={headingRef} className="space-y-4">
              <span className="section-label">ABOUT US</span>
              <h2 className="section-title">
                Building Digital Excellence <span className="gradient-text">Since 2014</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're a team of passionate developers and designers dedicated to creating beautiful, 
                performant, and user-centric web solutions. Every project is an opportunity to push 
                boundaries and deliver exceptional value.
              </p>
            </div>

            {/* Features Grid */}
            <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) featureItemsRef.current[index] = el;
                  }}
                  className="group p-4 rounded-xl bg-card-bg border border-card-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 text-primary group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex gap-4 pt-4">
              <button className="btn-primary">
                Let's Work Together
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
              </button>
              <button className="btn-secondary">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
