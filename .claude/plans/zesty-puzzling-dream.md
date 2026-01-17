# Plan: Remove "Interested in working together?" Section

## Summary
Remove the ContactCTA component from the homepage.

## Changes

### [src/pages/index.astro](src/pages/index.astro)
1. Remove the import statement for `ContactCTA` (line 4)
2. Remove the `<ContactCTA />` component usage (line 79)

## Verification
- Run the dev server and confirm the section no longer appears on the homepage
