// app/page.tsx
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { CreatorSection } from "@/components/home/CreatorSection";
import { FeaturedPromptsSection } from "@/components/home/FeaturedPromptsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedPromptsSection />
      <HowItWorksSection />
      <CreatorSection />
      <TestimonialsSection />
    </div>
  );
}
