import aboutModels from "@/assets/about-models.jpg";
import craftsmanship from "@/assets/craftsmanship.jpg";

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h1 className="font-display text-4xl md:text-5xl text-foreground">
            Where Style Meets Grace
          </h1>
          <p className="font-body text-muted-foreground leading-relaxed">
            Rangla Charkha celebrates the exquisite artistry of Pakistani women's fashion. Our collection is a beautiful fusion of timeless tradition and contemporary style, designed to bring the elegance of heritage into the modern era.
          </p>
        </div>
      </section>

      {/* Images */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <img src={aboutModels} alt="Rangla Charkha models" className="w-full h-80 object-cover rounded-sm" loading="lazy" />
            <img src={craftsmanship} alt="Traditional craftsmanship" className="w-full h-80 object-cover rounded-sm" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <h2 className="font-display text-3xl text-foreground">Our Craftsmanship</h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            At Rangla Charkha, we are rooted in the rich cultural heritage of Pakistan and committed to creating garments of the highest quality. Our skilled artisans meticulously handcraft each piece, preserving traditional techniques while embracing modern sophistication.
          </p>
          <div className="flex items-center gap-6 pt-4">
            {["Quality", "Elegance", "Heritage"].map((word) => (
              <span key={word} className="font-display text-primary text-lg">
                {word}
                <span className="text-muted-foreground mx-3">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <h2 className="font-display text-3xl text-foreground">Our Mission</h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            Rangla Charkha is a Pakistan-based women's fashion brand specializing in premium lawn and casual wear. Our mission is to provide affordable luxury fashion designed for modern women aged 18–45. We focus on fabric quality, elegant stitching, and timeless designs that combine comfort and confidence.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
