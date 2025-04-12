
export function setupIntersectionObserver() {
  const inViewport = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      const element = entry.target as HTMLElement;
      
      if (entry.isIntersecting) {
        element.classList.add("is-visible");
        // If we only want to show the animation once
        // observer.unobserve(element);
      } else {
        // Optional: remove the class when not in viewport
        // element.classList.remove("is-visible");
      }
    });
  };

  const observer = new IntersectionObserver(inViewport, {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root
    threshold: 0.1 // visible amount of item shown in relation to root
  });

  // Attach observer to every [data-inview] element
  const elements = document.querySelectorAll('.fade-in-section');
  elements.forEach(element => observer.observe(element));

  return observer;
}
