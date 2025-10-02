import footerApi from '@/api/footer';
import { FooterElement } from '@/types/footer';

export const getFooter = async (): Promise<FooterElement | null> => {
  try {
    const footer = await footerApi.fetchFooter();

    const [{ acf }] = footer;

    return acf;
  } catch (err) {
    console.error('ERROR', err);

    return null;
  }
};
