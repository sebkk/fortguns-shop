import { Hero } from '@/features/homepage';
import { ISectionHero } from '@/types/sections';

interface ISectionHeroProps {
  section: ISectionHero;
}

export const SectionHero = ({ section }: ISectionHeroProps) => {
  const { slides } = section;

  return <Hero slides={slides} />;
};
