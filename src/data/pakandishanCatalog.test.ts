import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  AFTER_SALES_PILLARS,
  BLOG_ARTICLES,
  CATALOG_CATEGORIES,
  CERTIFICATES_AND_AWARDS,
  COMPANY_OFFICES,
  COMPANY_STATS,
  EXPORT_REGIONS,
  getBlogBySlug,
  getProductBySlug,
  getProductsByCategory,
  OFFICIAL_CONTACT,
  PAKANDISHAN_PRODUCTS,
} from './pakandishanCatalog';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

test('PAKANDISHAN_PRODUCTS contains 20 authentic products with unique slugs and existing local WebP images', () => {
  assert.equal(PAKANDISHAN_PRODUCTS.length, 20);
  const slugs = new Set<string>();

  for (const product of PAKANDISHAN_PRODUCTS) {
    assert.ok(product.slug.length > 0, 'Product slug must be non-empty');
    assert.ok(!slugs.has(product.slug), `Duplicate slug: ${product.slug}`);
    slugs.add(product.slug);

    assert.ok(product.name.fa.length > 3, `Missing fa name for ${product.slug}`);
    assert.ok(product.name.en.length > 3, `Missing en name for ${product.slug}`);
    assert.ok(product.highlights.fa.length >= 2, `Missing fa highlights for ${product.slug}`);
    assert.ok(product.specs.length >= 2, `Missing specs for ${product.slug}`);

    const imgPath = path.join(PUBLIC_DIR, product.image.replace(/^\//, ''));
    assert.ok(fs.existsSync(imgPath), `Missing image on disk: ${imgPath}`);
    assert.equal(getProductBySlug(product.slug)?.id, product.id);
  }
});

test('CATALOG_CATEGORIES cover all 6 categories and return products cleanly', () => {
  assert.equal(CATALOG_CATEGORIES.length, 6);
  for (const cat of CATALOG_CATEGORIES) {
    const items = getProductsByCategory(cat.id);
    assert.ok(items.length > 0, `Category ${cat.id} returned 0 products`);
    const imgPath = path.join(PUBLIC_DIR, cat.image.replace(/^\//, ''));
    assert.ok(fs.existsSync(imgPath), `Missing category image: ${imgPath}`);
  }
  assert.equal(getProductsByCategory('all').length, 20);
});

test('BLOG_ARTICLES contain 6 verified real articles with existing local WebP images', () => {
  assert.equal(BLOG_ARTICLES.length, 6);
  const slugs = new Set<string>();

  for (const post of BLOG_ARTICLES) {
    assert.ok(!slugs.has(post.slug), `Duplicate blog slug: ${post.slug}`);
    slugs.add(post.slug);
    assert.ok(post.paragraphs.fa.length >= 2);
    assert.ok(post.paragraphs.en.length >= 2);
    const imgPath = path.join(PUBLIC_DIR, post.image.replace(/^\//, ''));
    assert.ok(fs.existsSync(imgPath), `Missing blog thumbnail: ${imgPath}`);
    assert.equal(getBlogBySlug(post.slug)?.id, post.id);
  }
});

test('Company offices, export regions, stats, certifications, and after-sales data are complete', () => {
  assert.equal(COMPANY_STATS.length, 5);
  assert.equal(COMPANY_OFFICES.length, 3);
  assert.equal(EXPORT_REGIONS.length, 4);
  assert.equal(CERTIFICATES_AND_AWARDS.length, 4);
  assert.equal(AFTER_SALES_PILLARS.length, 4);
  assert.equal(OFFICIAL_CONTACT.consultationPhone, '09960786617');
  const totalCountries = EXPORT_REGIONS.reduce(
    (sum, r) => sum + r.countries.en.length,
    0
  );
  assert.ok(totalCountries >= 20, `Expected >= 20 countries, got ${totalCountries}`);
});
