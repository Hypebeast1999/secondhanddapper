import { TestimonialsColumn } from "@/components/blocks/testimonials-columns-1";
import { TESTIMONIALS } from "@/data";

const firstColumn = TESTIMONIALS.slice(0, 3);
const secondColumn = TESTIMONIALS.slice(3, 6);
const thirdColumn = TESTIMONIALS.slice(6, 9);

export default function ReviewsSection() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-[1280px] px-6 text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">What buyers are saying</h2>
        <p className="text-muted-foreground mt-2">Real reviews from people who copped from Secondhanddapper.</p>
      </div>
      <div className="mx-auto max-w-[1280px] px-6 flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[700px] overflow-hidden">
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
      </div>
    </section>
  );
}
