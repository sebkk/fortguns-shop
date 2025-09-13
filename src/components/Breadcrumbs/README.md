# Breadcrumbs Component

A flexible and accessible breadcrumbs component for navigation.

## Features

- **Accessible**: Proper ARIA labels and semantic HTML
- **Customizable**: Multiple sizes, variants, and styling options
- **Responsive**: Adapts to different screen sizes
- **Truncation**: Automatically truncates long breadcrumb trails
- **Internationalization**: Supports custom labels and home text
- **TypeScript**: Fully typed with comprehensive interfaces

## Usage

### Basic Usage

```tsx
import { Breadcrumbs } from '@/components/Breadcrumbs';

const breadcrumbItems = [
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones', href: '/products/electronics/smartphones' },
  { label: 'iPhone 15', isActive: true },
];

<Breadcrumbs items={breadcrumbItems} />;
```

### With Custom Home

```tsx
<Breadcrumbs
  items={breadcrumbItems}
  showHome={true}
  homeLabel='Home'
  homeHref='/'
/>
```

### Different Sizes and Variants

```tsx
// Small size
<Breadcrumbs items={breadcrumbItems} size="small" />

// Large size
<Breadcrumbs items={breadcrumbItems} size="large" />

// Minimal variant
<Breadcrumbs items={breadcrumbItems} variant="minimal" />
```

### Custom Separator

```tsx
<Breadcrumbs items={breadcrumbItems} separator={<span>/</span>} />
```

### Truncation

```tsx
<Breadcrumbs
  items={breadcrumbItems}
  maxItems={3} // Will show first, last, and truncate middle items
/>
```

## Props

| Prop        | Type                             | Default                | Description                     |
| ----------- | -------------------------------- | ---------------------- | ------------------------------- |
| `items`     | `IBreadcrumbItem[]`              | -                      | Array of breadcrumb items       |
| `className` | `string`                         | -                      | Additional CSS class            |
| `separator` | `ReactNode`                      | `<ChevronRightIcon />` | Custom separator element        |
| `maxItems`  | `number`                         | `5`                    | Maximum items before truncation |
| `showHome`  | `boolean`                        | `true`                 | Whether to show home item       |
| `homeLabel` | `string`                         | `'Strona główna'`      | Home item label                 |
| `homeHref`  | `string`                         | `'/'`                  | Home item href                  |
| `size`      | `'small' \| 'medium' \| 'large'` | `'medium'`             | Component size                  |
| `variant`   | `'default' \| 'minimal'`         | `'default'`            | Visual variant                  |

## Types

```tsx
interface IBreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface IBreadcrumbsProps {
  items: IBreadcrumbItem[];
  className?: string;
  separator?: ReactNode;
  maxItems?: number;
  showHome?: boolean;
  homeLabel?: string;
  homeHref?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal';
}
```
