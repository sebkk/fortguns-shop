import { MenuItem } from '@/types/menus';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Button } from '@/components/Button';
import { LinkBtnNav } from '@/components/LinkBtnNav';
import { useRouter } from '@/i18n/navigation';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './styles.module.scss';

interface IHeaderDrawerNavProps {
  navHeaderMenuItems: MenuItem[];
}

interface ISelectedItem {
  href: string;
  title: string;
  child_items: MenuItem[] | null;
  prevItem: ISelectedItem | null;
}

export const HeaderDrawerNav = ({
  navHeaderMenuItems,
}: IHeaderDrawerNavProps) => {
  const t = useTranslations();

  const [selectedItem, setSelectedItem] = useState<ISelectedItem | null>(null);

  const { push } = useRouter();

  const handleSelectChildItems = (
    item: {
      href: string;
      title: string;
      child_items: MenuItem[] | null;
    } | null,
  ) => {
    if (!item) {
      setSelectedItem((prev) => prev?.prevItem || null);
      return;
    }

    setSelectedItem({
      ...item,
      prevItem: selectedItem,
    });
  };

  const navItems = selectedItem ? selectedItem.child_items : navHeaderMenuItems;

  return (
    <ul className={styles['header-drawer-nav-list']}>
      {selectedItem && (
        <li className={styles['header-drawer-nav-list-item']}>
          <Button
            onClick={() => handleSelectChildItems(null)}
            className={clsx(styles['header-drawer-nav-list-item_button-back'])}
            variant='outlined'
          >
            <ArrowIcon /> {t('goBack')}
          </Button>

          <Button
            className={styles['header-drawer-nav-list-item_button']}
            onClick={() => push(selectedItem?.href || '')}
          >
            {selectedItem?.title}
          </Button>
        </li>
      )}
      {navItems?.map(({ ID, title, child_items, slug, url }) => {
        const href = slug ? `/${slug}` : url;

        return (
          <li key={ID}>
            <LinkBtnNav
              className={styles['header-drawer-nav-list-item_button']}
              href={child_items ? undefined : href}
              linkProps={{
                anchorProps: {
                  role: child_items ? 'button' : 'link',
                  onClick: () =>
                    child_items &&
                    handleSelectChildItems({ title, href, child_items }),
                },
              }}
            >
              {title}
              {child_items && <ArrowIcon />}
            </LinkBtnNav>
          </li>
        );
      })}
    </ul>
  );
};
