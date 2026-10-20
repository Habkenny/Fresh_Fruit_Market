# Fresh Fruit Market — Frontend Demo

A responsive static fruit marketplace built with semantic HTML, CSS and vanilla JavaScript.

## Included
- Responsive desktop, tablet and mobile layouts
- Five fictional product cards
- Live search, category filters and price/name sorting
- Interactive basket with quantity buttons and subtotal
- Mobile navigation, newsletter form demo, accessible labels and keyboard focus
- SEO title, meta description, Open Graph metadata, robots.txt and sitemap.xml starter

## Run locally
1. Extract the ZIP and open this folder in VS Code.
2. Use the Live Server extension or run a static HTTP server in this folder.
3. Open the local URL supplied by your server.

## Deploy
**Netlify:** drag the folder into Netlify's manual deploy area, or connect the GitHub repository. No build command is needed; publish directory is the project root.

**GitHub Pages:** push to GitHub, then open Settings → Pages and select the branch and root folder.

## Demo limitations
- Prices are illustrative.
- Product photography loads from Unsplash and requires internet. For production, use assets you have rights to and consider storing them locally.
- Basket data is held in memory only and resets on refresh.
- Checkout is not connected to payment processing.
- Newsletter form is not connected to a mailing service and does not store email addresses.
- No backend, inventory, user accounts, delivery calculations or order management is included.

## Recommended before launch
1. Confirm real products, pricing, quantities, stock, delivery regions and business details.
2. Connect a backend/database for catalogue, stock, customer baskets and orders.
3. Integrate a payment provider and secure order workflow.
4. Connect newsletter signup to an email service with appropriate consent.
5. Add privacy, cookie, terms, delivery, refund and contact pages.
6. Replace example.com in robots.txt and sitemap.xml with your real domain.
7. Verify the site in Google Search Console and submit the sitemap.
8. Test with keyboard and screen reader; run Lighthouse and HTML validation.
9. Optimise and self-host images, set image dimensions, and add broken-image fallbacks.
10. If using analytics or advertising tools, implement appropriate UK privacy and cookie consent controls.

## Editing products
Product card data attributes and the matching catalogue in `js/main.js` must stay in sync when changing product IDs, categories or prices.
