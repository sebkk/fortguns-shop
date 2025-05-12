import { Accordion } from '@/components/Accordion';
import { Typography } from '@/components/Typography';

const faqData = [
  {
    question: 'Jakie rodzaje broni palnej oferujecie?',
    answer:
      'Oferujemy szeroki wybór broni palnej, w tym pistolety, rewolwery, karabiny i strzelby, renomowanych producentów. Nasza oferta ma charakter prezentacyjny, a pełny asortyment dostępny jest w naszym sklepie stacjonarnym. ',
  },
  {
    question: 'Czy mogę zamówić broń przez internet?',
    answer:
      'Zgodnie z polskim prawem, sprzedaż broni palnej wymaga osobistego potwierdzenia tożsamości i posiadanych zezwoleń w sklepie stacjonarnym. Nasza strona ma charakter informacyjny, a zakupów można dokonać wyłącznie na miejscu.',
  },
  {
    question: 'Czy prowadzicie szkolenia strzeleckie?',
    answer:
      'Tak, organizujemy szkolenia strzeleckie dla osób na różnym poziomie zaawansowania. Szczegółowe informacje o terminach i rodzajach szkoleń dostępne są wkrótce na naszej stronie lub bezpośrednio w sklepie.',
  },
  {
    question: 'Gdzie znajduje się Wasz sklep?',
    answer:
      'Nasz sklep znajduje się pod adresem Borowa 104a, 24-100 Borowa, Polska. Przed przyjazdem prosimy o wcześniejszy kontakt telefoniczny lub mailowy w celu umówienia wizyty.',
  },
  {
    question: 'Jakie dokumenty są potrzebne do zakupu broni?',
    answer:
      'Do zakupu broni palnej wymagane jest stosowne zezwolenie wydane przez właściwy organ Policji oraz dowód osobisty. W zależności od rodzaju broni, mogą być potrzebne dodatkowe dokumenty.',
  },
];

export const FaqPage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Typography variant='main-heading' tag='h1' className='mb-10 text-center'>
        Najczęściej zadawane pytania
      </Typography>

      <div className='flex flex-col gap-6'>
        {faqData.map((item, index) => (
          <Accordion key={index} title={item.question} content={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
