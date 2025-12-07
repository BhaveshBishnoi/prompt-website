import { Star } from "lucide-react";

// Testimonials Section
export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      company: "TechCorp",
      avatar: "SJ",
      text: "ReadyPrompt saved me hours every week. The SEO prompts are incredibly effective and helped us rank higher on Google.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Full-Stack Developer",
      company: "StartupXYZ",
      avatar: "MC",
      text: "The code review prompts are game-changers. My code quality improved significantly, and I learned best practices along the way.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Content Creator",
      company: "Freelancer",
      avatar: "ER",
      text: "I've earned over $3,000 selling my content prompts here. The platform is easy to use and the community is amazing!",
      rating: 5,
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600">See what our users are saying</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">{testimonial.text}</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
