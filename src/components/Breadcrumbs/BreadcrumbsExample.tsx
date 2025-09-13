'use client';

import { Breadcrumbs } from './Breadcrumbs';

// Example usage of the Breadcrumbs component
export const BreadcrumbsExample = () => {
  // Example breadcrumb items for different pages
  const brandsPageItems = [{ label: 'Marki', isActive: true }];

  const brandDetailItems = [
    { label: 'Marki', href: '/marki' },
    { label: 'Apple', isActive: true },
  ];

  const productItems = [
    { label: 'Produkty', href: '/produkty' },
    { label: 'Elektronika', href: '/produkty/elektronika' },
    { label: 'Smartfony', href: '/produkty/elektronika/smartfony' },
    { label: 'iPhone 15 Pro', isActive: true },
  ];

  const longBreadcrumbItems = [
    { label: 'Kategoria 1', href: '/cat1' },
    { label: 'Kategoria 2', href: '/cat1/cat2' },
    { label: 'Kategoria 3', href: '/cat1/cat2/cat3' },
    { label: 'Kategoria 4', href: '/cat1/cat2/cat3/cat4' },
    { label: 'Kategoria 5', href: '/cat1/cat2/cat3/cat4/cat5' },
    { label: 'Kategoria 6', href: '/cat1/cat2/cat3/cat4/cat5/cat6' },
    { label: 'Produkt', isActive: true },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>Breadcrumbs Examples</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>Brands Page</h3>
        <Breadcrumbs items={brandsPageItems} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Brand Detail Page</h3>
        <Breadcrumbs items={brandDetailItems} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Product Page</h3>
        <Breadcrumbs items={productItems} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Long Breadcrumb (with truncation)</h3>
        <Breadcrumbs items={longBreadcrumbItems} maxItems={4} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Different Sizes</h3>
        <div style={{ marginBottom: '10px' }}>
          <strong>Small:</strong>
          <Breadcrumbs items={productItems} size='small' />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Medium:</strong>
          <Breadcrumbs items={productItems} size='medium' />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Large:</strong>
          <Breadcrumbs items={productItems} size='large' />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Variants</h3>
        <div style={{ marginBottom: '10px' }}>
          <strong>Default:</strong>
          <Breadcrumbs items={productItems} variant='default' />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Minimal:</strong>
          <Breadcrumbs items={productItems} variant='minimal' />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Custom Separator</h3>
        <Breadcrumbs
          items={productItems}
          separator={<span style={{ margin: '0 8px' }}>/</span>}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Without Home</h3>
        <Breadcrumbs items={productItems} showHome={false} />
      </div>
    </div>
  );
};
