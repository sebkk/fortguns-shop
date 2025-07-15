import { THandlerComponentsProps } from '@/types/handlerComponents';
import { TFlexibleContentLayout } from '@/types/sections';

import { handlerComponents } from './handlerComponents';

interface ISectionHandlerProps {
  section: TFlexibleContentLayout;
}

export const SectionHandler = ({ section }: ISectionHandlerProps) => {
  const handlerComponent = handlerComponents[section.acf_fc_layout];

  if (!handlerComponent) return null;

  return (
    <section className='container'>
      {handlerComponent({
        section,
      } as THandlerComponentsProps)}
    </section>
  );
};
