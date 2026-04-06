# BAL Foods clone

This is a clean Vite + React + Tailwind rebuild of your Lovable BAL Foods site, keeping the flipbook catalogue.

## Run locally

```bash
npm install
npm run dev
```

## What is already included

- Homepage sections matching your Lovable structure
- BAL theme tokens, gradients, and scroll reveals
- Flipbook catalogue page at `/catalogue`
- BAL logo assets from your uploaded logo set
- A placeholder PDF in `public/catalogue/BAL_Marketing_Booklet_double.pdf` so the flipbook works immediately

## Swap these for a tighter 1:1 clone

Replace these placeholder files with your original Lovable assets:

- `src/assets/coastline.svg`
- `src/assets/chef-plating.svg`
- `src/assets/warehouse.svg`
- `src/assets/food-prep.svg`
- `src/assets/beef.svg`
- `src/assets/lamb.svg`
- `src/assets/poultry.svg`
- `src/assets/seafood.svg`
- `public/catalogue/BAL_Marketing_Booklet_double.pdf`

## Notes

- The dark-section logos use CSS inversion so you can keep one SVG source and still get the white look.
- If you want, the next step is replacing placeholders with your real images and wiring the contact CTA to your enquiry form.
